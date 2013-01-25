$ = require 'jqueryify'
_ = require 'underscore/underscore'


class Message
  constructor: (@payload, @proxy) ->
    @sent = false
    @deferred = new $.Deferred
  
  send: =>
    Api = require './api'

    if Api.checkMobile() == false
      @sent = true
      Api.proxy.send @
    else 
      @payload.url = "#{Api.host}/#{@payload.url}"
      if @payload.type is "getJSON"
        @payload.url = "#{@payload.url}?callback=?" 
        @payload.type = 'get'
        @payload.dataType = 'json'
        
      @payload.success  = @succeed
      @payload.error    = @fail
      @payload.complete = @always

      $.ajax @payload
    @ 

  always: (callback) => @tapped 'always', callback
  onSuccess: (callback) => @tapped 'done', callback
  onFailure: (callback) => @tapped 'fail', callback
  succeed: (args) => @tapped 'resolve', args
  fail: (args) => @tapped 'reject', args
  project: (callback) => @tapped 'pipe', callback
  isDelivered: => @deferred.isResolved()
  tapped: (method, args...) => _(@).tap => @deferred[method] args...

module.exports = Message

