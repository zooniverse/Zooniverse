window.zooniverse ?= {}
window.zooniverse.controllers ?= {}

EventEmitter = window.zooniverse.EventEmitter || require '../lib/event-emitter'
$ = window.jQuery

nextId = 0

class BaseController extends EventEmitter
  el: null
  tagName: 'div'
  className: ''
  template: null

  id: ''

  events: null
  elements: null

  constructor: (params = {}) ->
    super
    @[property] = value for own property, value of params when property of @

    @id ||= "controller_#{nextId}"
    nextId += 1

    @el ?= document.createElement @tagName
    @el = $(@el)

    @renderTemplate()
    @delegateEvents()
    @nameElements()

  renderTemplate: ->
    @el.addClass @className if @className

    unless @el.html()
      @el.html @template if typeof @template is 'string'
      @el.html @template @ if typeof @template is 'function'

  nameElements: ->
    if @elements? then for selector, name of @elements
      @[name] = @el.find(selector)

  delegateEvents: ->
    @el.off ".#{@id}"

    if @events? then for eventString, method of @events then do (eventString, method) =>
      [eventName, selector...] = eventString.split /\s+/
      selector = selector.join ' '

      if eventName[-1...] is '*'
        eventName = eventName[...-1]
        autoPreventDefault = true

      if typeof method is 'string'
        method = @[method]

      @el.on "#{eventName}.#{@id}", selector, (e) =>
        e.preventDefault() if autoPreventDefault
        method.call @, arguments...

  destroy: ->
    @[propertyName] = null for selector, propertyName of @elements if @elements?
    @el.off()
    @el.empty()
    @el.remove()
    super

window.zooniverse.controllers.BaseController = BaseController
module?.exports = BaseController
