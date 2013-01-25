window.zooniverse ?= {}
window.zooniverse.models ?= {}

BaseModel = window.zooniverse.models.BaseModel || require './base-model'
Api = window.zooniverse.Api || require '../lib/api'
Recent = window.zooniverse.models.Recent || require '../models/recent'
Favorite = window.zooniverse.models.Favorite || require '../models/favorite'
$ = window.jQuery

RESOLVED_STATE = (new $.Deferred).resolve().state()

class Classification extends BaseModel
  @pending: JSON.parse(localStorage.getItem 'pending-classifications') || []
  @sentThisSession: 0

  @sendPending: ->
    return if @pending.length is 0

    @trigger 'sending-pending', [classification]

    pendingPosts = []
    for classification in @pending then do (classification) =>
      latePost = Api.current.post classification.url, classification
      pendingPosts.push latePost

      latePost.done (response) =>
        @trigger 'send-pending', [classification]
        if classification.favorite
          # TODO
          favorite = new Favorite subjects: ({id} for id in classification.subject_ids)
          favorite.send()

      latePost.fail =>
        @trigger 'send-pending-fail', [classification]

      $.when(pendingPosts...).always =>
        # Clear out the pending list when they're all done.
        # Work backward so indices don't get messed up.
        for i in [pendingPosts.length - 1..0]
          @pending.splice i, 1 if pendingPosts[i].state() is RESOLVED_STATE

        localStorage.setItem 'pending-classifications', JSON.stringify @pending

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

  url: ->
    "/projects/#{Api.current.project}/workflows/#{@subject.workflow_ids[0]}/classifications"

  send: (done, fail) ->
    @constructor.sentThisSession += 1 unless @subject.metadata.tutorial

    post = Api.current.post @url(), @toJSON(), arguments...

    post.done =>
      @makeRecent()
      @constructor.sendPending()

    post.fail =>
      @makePending()

    @trigger 'send'

  makePending: ->
    asJSON = @toJSON()
    asJSON.url = @url()
    @constructor.pending.push asJSON

    localStorage.setItem 'pending-classifications', JSON.stringify @constructor.pending
    console.log "TRIGGER PENDING", @
    @trigger 'pending'

  makeRecent: ->
    recent = new Recent subjects: [@subject]
    recent.trigger 'from-classification'

    if @favorite
      favorite = new Favorite subjects: [@subject]
      favorite.trigger 'from-classification'

window.zooniverse.models.Classification = Classification
module?.exports = Classification
