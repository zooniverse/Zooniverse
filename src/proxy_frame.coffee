$ = require 'jqueryify'

class ProxyFrame
  @headers = { }
  
  constructor: (@host, @path = '/proxy') ->
    @append()
    $(window).on 'message', @receive
  
  el: ->
    $('#api-proxy-frame')
  
  elFrame: =>
    @el()[0]
  
  appended: =>
    @elFrame()?
  
  append: ->
    return if @appended()
    $('body').append @html()
  
  html: ->
    $('<iframe></iframe>')
      .attr('id', 'api-proxy-frame')
      .attr('src', "#{ @host }#{ @path }")
      .css('display', 'none')
  
  bind: (event, callback) ->
    @el().on event, callback
  
  postMessage: (message) =>
    @elFrame().contentWindow.postMessage JSON.stringify(message), @host
  
  send: (message) =>
    payload = message.payload
    payload['headers'] = ProxyFrame.headers
    @postMessage payload
  
  receive: ({ originalEvent: e }) =>
    return unless e.origin is @host
    message = JSON.parse e.data
    @el().trigger('response', message) unless message.id is 'READY'

module.exports = ProxyFrame
