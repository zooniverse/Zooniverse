$ = require 'jqueryify'
Dialog = require '../dialog'

class Tutorial
  steps: null
  hashMatch: null

  dialog: null
  current: -1

  constructor: ({@hashMatch, @steps}) ->
    @steps ?= []
    @dialog ?= new Dialog content: '', buttons: ['Continue': null]
    @dialog.buttons[0].el.off 'click' # Never resolve the dialog!
    @dialog.buttons[0].el.on 'click', @next

    # No underlay--use blockers to selectively disable areas.
    @dialog.el.css height: 0, position: 'static', width: 0

    @dialog.el.addClass 'tutorial'
    @dialog.el.addClass 'popup'

    if @hashMatch
      $(window).on 'hashchange', @onHashChange

  start: =>
    @steps[@current]?.leave @
    @current = -1
    @next()
    @dialog.open()
    @onHashChange()

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

  onHashChange: =>
    setTimeout =>
      return unless @dialog.el.hasClass 'open'

      if location.hash.match @hashMatch
        console.log 'Showing tutorial after hash change'
        @dialog.el.css display: ''

        if @steps[@current]?.attachment
          @dialog.attach @steps[@current].attachment

      else
        console.log 'Hiding tutorial after hash change'
        @dialog.el.css display: 'none'

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
        for eventName, selector of @nextOn
          # Avoid multiple fires because of bubbling!
          $(document).one eventName, "#{selector}:not(:has('#{selector}'))", tutorial.next

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
      blocker.appendTo 'body'
      @blockers = @blockers.add blocker

      blocker.css position: 'absolute', zIndex: 999
      blocker.width element.outerWidth()
      blocker.height element.outerHeight()
      blocker.offset element.offset()

  leave: (tutorial) =>
    @onLeave?.call @
    tutorial.dialog.el.removeClass 'next-on-action' if @nextOn
    tutorial.dialog.el.removeClass @className if @className
    @blockers.remove()

module.exports = Tutorial
