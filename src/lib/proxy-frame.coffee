window.zooniverse ?= {}

EventEmitter = window.zooniverse.EventEmitter || require './event-emitter'
$ = window.jQuery

html = $(document.body.parentNode)

messageId = -1

demo = !!~location.hostname.indexOf 'demo'
beta = !!~location.pathname.indexOf 'beta'
highPort = +location.port >= 1024
flaggedHost = location.search.match(/api=([^&]+)/)?[1]
flaggedHost = "//#{flaggedHost}" if flaggedHost? and not !!~flaggedHost.indexOf '//'

class ProxyFrame extends EventEmitter
  @REJECTION = 'ProxyFrame not connected'

  host: flaggedHost || "https://#{if demo or beta or highPort then 'dev' else 'api'}.zooniverse.org"
  path: '/proxy'
  loadTimeout: 5 * 1000
  retryTimeout: 2 * 60 * 1000

  el: null
  className: 'proxy-frame'

  attempt: 0
  ready: false
  failed: false

  deferreds: null
  queue: null

  constructor: (params = {}) ->
    super
    @[property] = value for own property, value of params when property of @ and value?

    @deferreds ?= {}
    @queue ?= []

    $(window).on 'message', ({originalEvent: e}) =>
      @onMessage arguments... if e.source is @el.get(0).contentWindow

    @connect()

  connect: ->
    testBad = if @attempt < 0 then '_BAD' else ''
    @attempt += 1
    @el?.remove()
    @el = $("<iframe src='#{@host}#{@path}#{testBad}' class='#{@className}' data-attempt='#{@attempt}' style='display: none;'></iframe>")
    @el.appendTo document.body
    setTimeout (=> @timeout() unless @ready), @loadTimeout

  onReady: ->
    @attempt = 0
    @ready = true
    @failed = false
    setTimeout (=> @process payload for payload in @queue), 100
    html.removeClass 'offline'
    @trigger 'ready'

  timeout: =>
    @trigger 'timeout', @loadTimeout
    @onFailed()

  onFailed: ->
    return if @ready
    @failed = true

    @deferreds[payload.id].reject(@constructor.REJECTION) for payload in @queue
    @queue.splice 0

    html.addClass 'offline'
    @trigger 'fail'
    setTimeout (=> @connect()), @retryTimeout

  send: (payload, done, fail) ->
    messageId += 1
    payload.id = messageId

    deferred = new $.Deferred
    deferred.then done, fail
    do (messageId, deferred) =>
      deferred.always =>
        delete @deferreds[messageId]

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

  destroy: ->
    @el.remove()
    super

window.zooniverse.ProxyFrame = ProxyFrame
module?.exports = ProxyFrame
