$ = require 'jqueryify'
_ = require 'underscore/underscore'
ProxyFrame = require './proxy_frame'
Message = require './message'

Api =
  messages: { }
  ready: false
  proxy: undefined
  
  get: -> Api.request 'get', arguments...
  getJSON: -> Api.request 'getJSON', arguments...
  post: -> Api.request 'post', arguments...
  put: -> Api.request 'put', arguments...
  delete: -> Api.request 'delete', arguments...
  
  init: (options = { }) ->
    return if Api.proxy
    options = $.extend {
      host: "#{ window.location.protocol }//#{ window.location.host }"
      proxyPath: '/proxy'
    }, options
    
    Api.host = options.host
    Api.proxy = new ProxyFrame Api.host, options.proxyPath
    Api.proxy.bind 'load', Api.loaded
    Api.proxy.bind 'response', Api.respond
  
  loaded: ->
    Api.ready = true
    Api.process(id) for id, message of Api.messages when not message.sent
  
  request: (type, url, data, done, fail) ->
    id = Api.nextId()
    
    if typeof data is 'function'
      fail = done
      done = data
      data = null
    
    message = new Message { id, type, url, data }, Api.proxy
    message.onSuccess(done) if done
    message.onFailure(fail) if fail
    
    Api.messages[id] = message
    Api.process(id) if Api.ready
    message
  
  respond: (ev, result) ->
    message = Api.messages[result.id]
    
    if result.failure
      message.fail result.response
    else
      message.succeed result.response
    
    delete Api.messages[result.id]
  
  process: (id) ->
    Api.proxy.send Api.messages[id]
  
  nextId: ->
    _.uniqueId 'api-'

module.exports = Api
