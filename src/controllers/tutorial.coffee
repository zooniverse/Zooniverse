$ = require 'jqueryify'
Dialog = require '../dialog'

class Tutorial
  steps: null

  dialog: null
  current: -1

  constructor: ({@target, @steps}) ->
    @steps ?= []
    @dialog ?= new Dialog content: '', buttons: ['Continue': null]
    @dialog.buttons[0].el.off 'click' # Never resolve the dialog!
    @dialog.buttons[0].el.on 'click', @next
    @dialog.el.addClass 'tutorial'
    @dialog.el.addClass 'popup'

  start: =>
    @steps[@current]?.leave @
    @current = -1
    @next()
    @dialog.open()

  next: =>
    @steps[@current]?.leave @
    @current += 1

    if @steps[@current]
      @steps[@current].enter @
    else
      @end()

  end: =>
    @steps[@current]?.leave @
    @current = -1
    @dialog.close()


class Tutorial.Step
  title: ''
  content: ''
  attachment: null
  block: ''
  nextOn: null
  className: ''
  style: null
  arrowDirection: ''
  onEnter: null
  onLeave: null

  blockers: null

  constructor: (params = {}) ->
    @[property] = value for own property, value of params

  enter: (tutorial) =>
    @onEnter?.call @
    tutorial.dialog.el.find('header').html @title
    tutorial.dialog.contentContainer.html @content

    if @nextOn?
      tutorial.dialog.el.addClass 'next-on-action'
      # Delay to prevent this from firing immediately.
      setTimeout =>
        $(document).on eventName, selector, tutorial.next for eventName, selector of @nextOn

    tutorial.dialog.el.addClass @className if @className
    tutorial.dialog.el.css @style if @style

    setTimeout (=>
      tutorial.dialog.attach @attachment if @attachment
      @createBlockers()
    ), @delay

  createBlockers: =>
    @blockers = $()

    for element in $(@block)
      element = $(element)
      blocker = $('<div class="tutorial-blocker"></div>')
      blocker.insertAfter @tutorial.el
      @blockers = @blockers.add blocker

      blocker.css position: 'absolute'
      blocker.width element.outerWidth()
      blocker.height element.outerHeight()
      blocker.offset element.offset()

  leave: (tutorial) =>
    @onLeave?.call @

    if @nextOn?
      $(document).off eventName, selector, tutorial.next for eventName, selector of @nextOn
      tutorial.dialog.el.removeClass 'next-on-action'

    tutorial.dialog.el.removeClass @className if @className

    @blockers.remove()

module.exports = Tutorial
