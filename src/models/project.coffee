window.zooniverse ?= {}
window.zooniverse.models ?= {}

BaseModel = window.zooniverse.models.BaseModel || require './base-model'
Api = window.zooniverse.Api || require '../lib/api'
ProjectGroup = window.zooniverse.models.Group || require './project-group'
$ = window.jQuery

class Project extends BaseModel

  # Idea here is to auto-fetch any additional project info on project fetch
  # At the moment, just fetches project groups.
  @extended: false

  @current: false

  @path: ->
    "projects/#{ Api.current.project }"

  @fetch: =>
    @trigger 'fetching'

    fetcher = new $.Deferred()
    fetcher.done @onFetch

    # Look for pre-fetched project
    if window.DEFINE_ZOONIVERSE_PROJECT?
      fetcher.resolve window.DEFINE_ZOONIVERSE_PROJECT

    else
      request = Api.current.get @path()

      request.done (result) =>
        fetcher.resolve result

      request.fail =>
        @trigger 'fetch-fail'
        fetcher.reject arguments...

    fetcher

  @onFetch: (result) =>
    @current = new @ result if result.name is Api.current.project
    @trigger 'base-fetch', [@current]

    unless @extended
      @_cleanUpFetch()

    else
      grouper = ProjectGroup.fetch()
      grouper.always @_cleanUpFetch

  @_cleanUpFetch: =>
    @trigger 'fetch', [@current]

  id: ''

  classification_count: 0
  complete_count: 0
  user_count: 0

  display_name: ''
  name: ''

  site_prefix: ''

  created_at: ''
  updated_at: ''

window.zooniverse.models.Project = Project
module?.exports = Project