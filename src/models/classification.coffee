BaseModel = window.zooniverse?.models?.BaseModel || require './base-model'
Api = window.zooniverse?.Api || require '../lib/api'
Recent = window.zooniverse?.models?.Recent || require '../models/recent'
Favorite = window.zooniverse?.models?.Favorite || require '../models/favorite'
LanguageManager = window.zooniverse?.LanguageManager || require '../lib/language-manager'
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

  generic: null
  started_at: null
  finished_at: null
  user_agent: null

  constructor: ->
    super
    @annotations ?= []

    @generic = {}
    @started_at = (new Date).toUTCString()
    @user_agent = window.navigator.userAgent

  annotate: (annotation) ->
    @annotations.push annotation
    annotation

  removeAnnotation: (annotation) ->
    for a, i in @annotations when a is annotation
      return @annotations.splice i, 1

  set: (key, value) ->
    @generic[key] = value
    @trigger 'change', [key, value]

  get: (key) ->
    @generic[key]

  toJSON: ->
    lang = LanguageManager.current?.code
    output = classification:
      subject_ids: [@subject.id]
      annotations: @annotations.concat [{@started_at, @finished_at}, {@user_agent}, {lang}]

    for key, value of @generic
      annotation = {}
      annotation[key] = value
      output.classification.annotations.push annotation

    output.classification.favorite = true if @favorite

    output

  url: ->
    "/projects/#{Api.current.project}/workflows/#{@subject.workflow_ids[0]}/classifications"

  send: (done, fail) ->
    @constructor.sentThisSession += 1 unless @subject.metadata.tutorial
    @finished_at = (new Date).toUTCString()

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
    @trigger 'pending'

  makeRecent: ->
    recent = new Recent subjects: [@subject]
    recent.trigger 'from-classification'

    if @favorite
      favorite = new Favorite subjects: [@subject]
      favorite.trigger 'from-classification'

window.zooniverse ?= {}
window.zooniverse.models ?= {}
window.zooniverse.models.Classification = Classification
module?.exports = Classification
