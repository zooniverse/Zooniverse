$ = require 'jqueryify'
_ = require 'underscore/underscore'
ProxyFrame = require 'proxy_frame'

class Api
  @requests = { }
  @ready = false
  @proxy = undefined
  @host = "#{ window.location.protocol }//#{ window.location.host }"
  
  @get: -> Api.request 'get', arguments...
  @getJSON: -> Api.request 'getJSON', arguments...
  @post: -> Api.request 'post', arguments...
  @put: -> Api.request 'put', arguments...
  @delete: -> Api.request 'delete', arguments...
  
  @init: ->
    return if Api.proxy
    Api.proxy = new ProxyFrame Api.host
    Api.proxy.bind 'load', Api.loaded
    Api.proxy.bind 'response', Api.respond
  
  @loaded: ->
    Api.ready = true
    Api.process(id) for id, request of Api.requests when not request.processed
  
  @request: (type, url, data, done, fail) ->
    id = Api.nextId()
    
    if typeof data is 'function'
      fail = done
      done = data
      data = null
    
    message = { id, type, url, data, done, fail }
    Api.requests[id] = message
    if Api.ready then Api.process id else message.processed = false
  
  @respond: (ev, message) ->
    request = Api.requests[message.id]
    
    if message.failure
      request.fail? message.response
    else
      request.done? message.response
    
    delete Api.requests[message.id]
  
  @process: (id) ->
    Api.requests[id].processed = true
    message = _(Api.requests[id]).pick 'id', 'type', 'url', 'data'
    Api.proxy.send message
  
  @nextId: ->
    _.uniqueId 'api-'

module.exports = Api
