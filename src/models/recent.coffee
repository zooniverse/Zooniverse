window.zooniverse ?= {}
window.zooniverse.models ?= {}

BaseModel = zooniverse.models.BaseModel || require './base-model'
Api = zooniverse.Api || require '../lib/api'
User = zooniverse.models.User || require './user'
$ = window.jQuery

class Recent extends BaseModel
  @type: 'recent'

  @path: ->
    "/projects/#{Api.current.project}/users/#{User.current.id}/#{@type}s"

  @fetch: (params, done, fail) ->
    @trigger 'fetching'

    [done, fail, params] = [params, done, {}] if typeof params is 'function'
    params = $.extend page: 1, per_page: 10, params

    fetcher = new $.Deferred
    fetcher.then done, fail

    request = Api.current.get @path(), params

    request.done (rawRecents) =>
      newRecents = (new @ rawRecent for rawRecent in rawRecents)
      @trigger 'fetch', [newRecents]
      fetcher.resolve newRecents

    request.fail =>
      @trigger 'fetch-fail'
      fetcher.fail arguments...

    fetcher.promise()

  @clearOnUserChange: ->
    self = @
    User.on 'change', ->
      self.first().destroy() until self.count() is 0

  @clearOnUserChange()

  id: ''
  subjects: null
  project_id: ''
  workflow_id: ''
  created_at: ''

  constructor: ->
    super
    @subjects ?= []
    @project_id ||= @subjects[0].project_id
    @workflow_id ||= @subjects[0].workflow_ids[0]
    @created_at ||= (new Date).toUTCString()

window.zooniverse.models.Recent = Recent
module?.exports = Recent
