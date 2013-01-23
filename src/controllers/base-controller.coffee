window.zooniverse ?= {}
window.zooniverse.controllers ?= {}

EventEmitter = window.zooniverse.EventEmitter || require 'zooniverse/lib/event-emitter'
$ = window.jQuery

class BaseController extends EventEmitter
  el: null
  tagName: 'div'
  className: ''
  template: null

  events: null
  elements: null

  constructor: (params = {}) ->
    @[property] = value for own property, value of params when property of @

    @el ?= document.createElement @tagName
    @el = $(@el)

    @renderTemplate()
    @delegateEvents()
    @nameElements()

  renderTemplate: ->
    @el.html @template @
    @el.addClass @className if @className

  nameElements: ->
    if @elements? then for selector, name of @elements
      @[name] = @el.find(selector)

  delegateEvents: ->
    @el.off()

    if @events? then for eventString, method of @events then do (eventString, method) =>
      [eventName, selector...] = eventString.split /\s+/
      selector = selector.join ' '

      if eventName[-1...] is '*'
        eventName = eventName[...-1]
        autoPreventDefault = true

      if typeof method is 'string'
        method = @[method]

      @el.on eventName, selector, (e) =>
        e.preventDefault() if autoPreventDefault
        method.call @, arguments...

window.zooniverse.controllers.BaseController = BaseController
module?.exports = BaseController
