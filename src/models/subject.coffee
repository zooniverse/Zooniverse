window.zooniverse ?= {}
window.zooniverse.models ?= {}

BaseModel = zooniverse.models.BaseModel || require './base-model'
Api = zooniverse.Api || require '../lib/api'
$ = window.jQuery

class Subject extends BaseModel
  @current: null

  @queueLength: 5

  @group: false

  @path: ->
    groupString = if not @group
      ''
    else if @group is true
      'groups/'
    else
      "groups/#{@group}/"

    "/projects/#{Api.current.project}/#{groupString}subjects"

  @next: (done, fail) ->
    @current?.destroy()

    nexter = new $.Deferred
    nexter.then done, fail

    if @count() is 0
      fetcher = @fetch()

      fetcher.done (newSubjects) =>
        @first()?.select()

        if @current
          nexter.resolve @current
        else
          @trigger 'no-more-subjects'
          nexter.reject arguments...

      fetcher.fail =>
        nexter.reject arguments...

    else
      @first().select()
      nexter.resolve @current
      @fetch() if @count() < @queueLength

    nexter.promise()

  @fetch: (params, done, fail) ->
    [done, fail, params] = [params, done, {}] if typeof params is 'function'

    {limit} = params || {}
    limit ?= @queueLength - @count()

    fetcher = new $.Deferred
    fetcher.then done, fail

    if limit > 0
      request = Api.current.get @path(), {limit}

      request.done (rawSubjects) =>
        newSubjects = (new @ rawSubject for rawSubject in rawSubjects)
        fetcher.resolve newSubjects
        @trigger 'fetched', [newSubjects]

      request.fail =>
        fetcher.fail arguments...
        @trigger 'fetch-failed'

    else
      fetcher.resolve @instances[0...number]

    fetcher.promise()

  id: ''
  zooniverse_id: ''
  coords: null
  location: null
  metadata: null
  project_id: ''
  workflow_ids: null

  constructor: ->
    super

    @location ?= {}
    @coords ?= []
    @metadata ?= {}

    @preloadImages()

  preloadImages: ->
    for type, imageSources of @location
      imageSources = [imageSources] unless imageSources instanceof Array
      (new Image).src = src for src in imageSources

  select: ->
    @constructor.current = @
    @trigger 'selecting'

window.zooniverse.models.Subject = Subject
module?.exports = Subject
