window.zooniverse ?= {}

$ = window.jQuery

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

  @trigger: (eventName, args) ->
    @jQueryEventProxy ?= $({})
    @jQueryEventProxy.trigger arguments...
    @constructor.trigger? eventName, [@].concat args

  # Add these methods to the prototype.
  for own methodName, method of @
    @::[methodName] = method

  destroy: ->
    @trigger 'destroying'
    @off()

window.zooniverse.EventEmitter = EventEmitter
module?.exports = EventEmitter
