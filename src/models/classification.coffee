window.zooniverse ?= {}
window.zooniverse.models ?= {}

BaseModel = zooniverse.models.BaseModel || require './base-model'
Api = zooniverse.Api || require '../lib/api'
Recent = zooniverse.models.Recent || require '../models/recent'
$ = window.jQuery

RESOLVED_STATE = (new $.Deferred).resolve().state()

class Classification extends BaseModel
  @pending: JSON.parse(localStorage.getItem 'pending-classifications') || []
  @sentThisSession: 0

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
      pendingPosts = []

      for classification in @constructor.pending then do (classification) =>
        @trigger 'sending-pending', [classification]
        latePost = Api.current.post url, classification
        pendingPosts.push latePost

        latePost.done =>
          @trigger 'send-pending', [classification]
          for c, i in @constructor.pending when c is classification
            @constructor.pending.splice i, 1
            break

        latePost.fail =>
          @trigger 'send-pending-fail', [classification]

        $.when(pendingPosts...).always =>
          # Clear out the pending list when they're all done.
          for i in [pendingPosts.length - 1..0]
            @constructor.pending.splice i, 1 if pendingPosts[i].state() is RESOLVED_STATE

          localStorage.setItem 'pending-classifications', JSON.stringify @constructor.pending

    post.fail =>
      @constructor.pending.push asJSON
      localStorage.setItem 'pending-classifications', JSON.stringify @constructor.pending
      console?.warn "Post failed! #{@constructor.pending.length} pending"
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
