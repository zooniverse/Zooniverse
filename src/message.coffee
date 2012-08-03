$ = require 'jqueryify'
_ = require 'underscore/underscore'

class Message
  constructor: (@payload, @proxy) ->
    @sent = false
    @deferred = new $.Deferred
  
  send: =>
    @sent = true
    @proxy.send @
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
