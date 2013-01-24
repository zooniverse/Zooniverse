window.zooniverse ?= {}

$ = window.jQuery

logTriggers = !!~location.href.indexOf 'log=1'

class EventEmitter
  @proxy: (method) ->
    $.proxy (if typeof method is 'function' then [method, @] else [@, method])...

  @on: (eventName, handler) ->
    @jQueryEventProxy ?= $({})
    @jQueryEventProxy.on eventName, @proxy handler

  @one: (eventName, handler) ->
    @jQueryEventProxy ?= $({})
    @jQueryEventProxy.one eventName, @proxy handler

  @off: (eventName, handler) ->
    @jQueryEventProxy ?= $({})
    @jQueryEventProxy.off eventName, @proxy handler

  @trigger: (eventName, args = []) ->
    if logTriggers
      console?.info @name || @.toString(), eventName.toUpperCase(), args

    @jQueryEventProxy ?= $({})
    @jQueryEventProxy.trigger arguments...
    @constructor.trigger? eventName, [@].concat args

  # Add these methods to the prototype.
  for own methodName, method of @
    @::[methodName] = method

  destroy: ->
    @trigger 'destroying'
    @off()

  if logTriggers
    @::toString = ->
      "#{@constructor.name} instance"

window.zooniverse.EventEmitter = EventEmitter
module?.exports = EventEmitter
