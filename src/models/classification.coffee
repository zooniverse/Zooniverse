window.zooniverse ?= {}
window.zooniverse.models ?= {}

BaseModel = zooniverse.models.BaseModel || require './base-model'
Api = zooniverse.Api || require '../lib/api'
$ = window.jQuery

class Classification extends BaseModel
  @localClassifications = null
  @sentThisSession = 0

  subject: null
  annotations: null
  favorite: false

  started: null
  agent: null

  constructor: ->
    super
    @annotations ?= []

    @started = (new Date).toUTCString()
    @agent = window.navigator.userAgent

  annotate: (annotation) ->
    @annotations.push annotation


  toJSON: ->
    output = classification:
      subject_ids: [@subject.id]
      annotations: @annotations.concat [{@started}, {@agent}]

    output.favorite = true if @favorite

    output

  send: (done, fail) ->
    unless @subject.metadata.tutorial or @subject.metadata.empty
      @constructor.sentThisSession += 1

    url = "/projects/#{Api.current.project}/workflows/#{@subject.workflow_ids[0]}/classifications"
    asJSON = @toJSON()

    post = Api.current.post url, asJSON, arguments...

    post.done =>
      # TODO: Send all the pending classifications now.

    post.fail =>
      @constructor.localClassifications ?= JSON.parse localStorage.getItem('pending-classifications') || '[]'
      @constructor.localClassifications.push asJSON
      localStorage.setItem 'pending-classifications', JSON.stringify @constructor.localClassifications
      console?.warn "Post failed! #{@constructor.localClassifications.length} pending"
      @trigger 'pending'

    @trigger 'send'

    # TODO: Recents and favorites

    # recent = Recent.create subjects: @subject
    # recent.trigger 'send'
    # recent.trigger 'is-new'

    # if @favorite
    #   favorite = Favorite.create subjects: @subject
    #   favorite.trigger 'send'
    #   favorite.trigger 'is-new'

window.zooniverse.models.Classification = Classification
module?.exports = Classification
