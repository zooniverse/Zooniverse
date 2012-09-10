$ = require 'jqueryify'

# Basic usage:
#
# d = new Dialog
#   title: 'Hey'
#   content: 'What's up?'
#   buttons: [{'Nothing': null}, {'Something': true}]
#   callback: (value) ->
#     alert "You must be very busy" if value?

class Dialog
  class @Button
    label: 'OK'
    value: null

    tag: 'button'
    className: 'dialog-button'

    dialog: null

    el: null

    constructor: (params = {}) ->
      @[property] = value for own property, value of params

      @el ?= $("<#{@tag} class='#{@className}'>#{@label}</#{@tag}>")
      @el.on 'click', =>
        @dialog.deferred.resolve @value
        @onClick?()

    onClick: ->
      # Override this.

  title: ''
  content: '<p>Lorem ipsum dolor sit amet.</p>'
  buttons: null
  attachment: null
  openImmediately: false
  destroyOnClose: false
  callback: null

  className: 'dialog'
  arrowDirection: ''
  margin: 15

  el: null # Including underlay
  dialog: null
  contentContainer: null

  deferred: null
  promise: null

  constructor: (params = {}) ->
    @[property] = value for own property, value of params
    @buttons ?= [new @constructor.Button label: 'OK', value: true]

    ctorClassName = @constructor::className

    @el = $("""
      <div class="#{ctorClassName}-underlay">
        <div class="#{ctorClassName}">
          <button name="close" class="#{ctorClassName}-closer">&times;</button>
          <header></header>
          <div class="#{ctorClassName}-content"></div>
          <footer></footer>
          <div class="#{ctorClassName}-arrow" data-direction="#{@arrowDirection}"></div>
        </div>
      </div>
    """)

    @dialog = @el.children ".#{ctorClassName}"
    @contentContainer = @dialog.children ".#{ctorClassName}-content"
    @arrow = @dialog.children ".#{ctorClassName}-arrow"
    closer = @dialog.children ".#{ctorClassName}-closer"

    @el.on 'click', ({target}) =>
      target = $(target)

      if (target.is(@el) and @buttons.length is 0) or target.is closer
        @deferred.resolve()

    @render()
    @el.appendTo 'body'

    @open() if @openImmediately

  render: =>
    @el.find('header').html @title
    @contentContainer.html @content

    @el.find('footer').empty()
    for button, i in @buttons
      unless button instanceof @constructor.Button
        # Convert {label: value} button descriptions to Button instances
        for own label, value of button
          @buttons[i] = new @constructor.Button {label, value}

      @buttons[i].dialog = @
      @buttons[i].el.appendTo @el.find 'footer'

  open: =>
    @el.addClass 'open'
    @attach()

    @deferred = new $.Deferred
    @deferred.then @close
    @promise = @deferred.promise()

  attach: (@attachment = @attachment) ->
    # Fill in defaults if they're not provided.
    @attachment ?= {}
    @attachment.x ?= 'center'
    @attachment.y ?= 'middle'
    @attachment.to ?= 'body'
    @attachment.at ?= {}
    @attachment.at.x ?= 'center'
    @attachment.at.y ?= 'middle'

    xStrings = left: 0, center: 0.5, right: 1
    yStrings = top: 0, middle: 0.5, bottom: 1

    @attachment.x = xStrings[@attachment.x] if @attachment.x of xStrings
    @attachment.y = yStrings[@attachment.y] if @attachment.y of yStrings
    @attachment.at.x = xStrings[@attachment.at.x] if @attachment.at.x of xStrings
    @attachment.at.y = yStrings[@attachment.at.y] if @attachment.at.y of yStrings

    target = $(@attachment.to).first()

    targetSize = width: target.outerWidth(), height: target.outerHeight()
    targetOffset = target.offset()

    stepSize = width: @dialog.outerWidth(), height: @dialog.outerHeight()
    stepOffset =
      left: targetOffset.left - (stepSize.width * @attachment.x) + (targetSize.width * @attachment.at.x)
      top: targetOffset.top - (stepSize.height * @attachment.y) + (targetSize.height * @attachment.at.y)

    @dialog.css position: 'absolute'
    @dialog.offset stepOffset

    @arrow.attr 'data-direction', @arrowDirection

    @dialog.css marginLeft: switch @arrowDirection
      when 'left' then +@margin
      when 'right' then -@margin
      else ''

    @dialog.css marginTop: switch @arrowDirection
      when 'top' then +@margin
      when 'bottom' then -@margin
      else ''

  close: =>
    @el.removeClass 'open'
    @deferred = null
    @promise = null
    @callback if @callback?
    setTimeout => @destroy() if @destroyOnClose

  destroy: =>
    @el.remove()

module.exports = Dialog
