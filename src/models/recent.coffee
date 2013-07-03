window.zooniverse ?= {}
window.zooniverse.models ?= {}

BaseModel = window.zooniverse.models.BaseModel || require './base-model'
Api = window.zooniverse.Api || require '../lib/api'
User = window.zooniverse.models.User || require './user'
Subject = window.zooniverse.models.Subject || require './subject'
$ = window.jQuery

class SubjectForRecent extends Subject
  # Keep these separate from regular subjects.
  # We don't want to re-classify them.

class Recent extends BaseModel
  @type: 'recent'

  @path: ->
    "/projects/#{Api.current.project}/users/#{User.current?.id}/#{@type}s"

  @fetch: (params, done, fail) ->
    @trigger 'fetching'

    [done, fail, params] = [params, done, {}] if typeof params is 'function'
    params = $.extend page: 1, per_page: 10, params

    fetcher = new $.Deferred
    fetcher.then done, fail

    request = Api.current.get @path(), params

    request.done (rawRecents) =>
      # Recents are returned newest first, but create them oldest first.
      # That way recents created on the fly will be in the right order.
      newRecents = (new @ rawRecent for rawRecent in rawRecents.reverse())
      @trigger 'fetch', [newRecents]
      fetcher.resolve newRecents

    request.fail =>
      @trigger 'fetch-fail'
      fetcher.reject arguments...

    fetcher.promise()

  @clearOnUserChange: ->
    self = @
    User.on 'change', ->
      self.first().destroy() until self.count() is 0

  @clearOnUserChange()

  subjects: null
  project_id: ''
  workflow_id: ''
  created_at: ''

  constructor: ->
    super
    @subjects ?= []
    @project_id ||= @subjects[0]?.project_id
    @workflow_id ||= @subjects[0]?.workflow_ids?[0]
    @created_at ||= (new Date).toUTCString()

    for subject, i in @subjects
      @subjects[i] = new SubjectForRecent subject

window.zooniverse.models.Recent = Recent
module?.exports = Recent
