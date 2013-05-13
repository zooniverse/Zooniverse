window.zooniverse ?= {}
window.zooniverse.models ?= {}

BaseModel = window.zooniverse.models.BaseModel || require './base-model'
Api = window.zooniverse.Api || require '../lib/api'
Project = window.zooniverse.models.Project || require './project'
$ = window.jQuery

class ProjectGroup extends BaseModel

  @path: ->
    "projects/#{ Api.current.project }/groups"

  @fetch: =>
    @trigger 'fetching'

    fetcher = new $.Deferred()
    fetcher.done @onFetch

    # Look for pre-fetched project groups
    if window.DEFINE_ZOONIVERSE_PROJECT_GROUPS?
      fetcher.resolve window.DEFINE_ZOONIVERSE_PROJECT_GROUPS

    else
      request = Api.current.get @path()

      request.done (result) =>
        fetcher.resolve result

      request.fail =>
        @trigger 'fetch-fail'
        fetcher.reject arguments...

    fetcher

  @onFetch: (rawGroups) =>
    newGroups = (new @ rawGroup for rawGroup in rawGroups)
    @trigger 'fetch', [newGroups]

  id: ''
  group_id: ''
  project_id: ''
  zooniverse_id: ''

  name: ''
  project_name: ''

  categories: []
  metadata: {}
  stats: {}
  state: 'active'
  type: ''

  classification_count: 0

  created_at: ''
  updated_at: ''
    
window.zooniverse.models.ProjectGroup = ProjectGroup
module?.exports = ProjectGroup