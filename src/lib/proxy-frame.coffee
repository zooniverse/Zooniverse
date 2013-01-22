window.zooniverse ?= {}

EventEmitter = zooniverse.EventEmitter || require './event-emitter'
$ = window.jQuery

messageId = -1

class ProxyFrame extends EventEmitter
  @REJECTION = 'ProxyFrame not connected'

  host: "https://#{if +location.port < 1024 then 'api' else 'dev'}.zooniverse.org"
  path: '/proxy'

  loadTimeout: 5000
  className: 'proxy-frame'

  ready: false
  failed: false

  deferreds: null
  queue: null

  constructor: (params = {}) ->
    @[property] = value for own property, value of params when property of @ and value?

    @deferreds ?= []
    @queue ?= []

    @el = $("<iframe src='#{@host}#{@path}' class='#{@className}' style='display: none;'></iframe>")
    @el.appendTo 'body'

    setTimeout (=> @onFailed() unless @ready), @loadTimeout

    $(window).on 'message', ({originalEvent: e}) =>
      @onMessage arguments... if e.source is @el.get(0).contentWindow

  onReady: ->
    return if @failed
    @ready = true
    setTimeout (=> @process payload for payload in @queue), 100
    @trigger 'ready'

  onFailed: ->
    return if @ready
    @failed = true
    @deferreds[payload.id].reject(@constructor.REJECTION) for payload in @queue
    @trigger 'failed'

  send: (payload, done, fail) ->
    messageId += 1
    payload.id = messageId

    deferred = new $.Deferred
    deferred.then done, fail

    @deferreds[messageId] = deferred

    if @failed
      deferred.reject @constructor.REJECTION
    else if @ready
      @process payload
    else
      @queue.push payload

    deferred.promise()

  process: (payload) ->
    @el.get(0).contentWindow.postMessage JSON.stringify(payload), @host

  onMessage: ({originalEvent: e}) ->
    message = JSON.parse e.data

    return @onReady() if message.id is 'READY'

    if message.failure
      @deferreds[message.id].reject message.response
    else
      @deferreds[message.id].resolve message.response

    @trigger 'response', [message]

window.zooniverse.ProxyFrame = ProxyFrame
module?.exports = ProxyFrame
