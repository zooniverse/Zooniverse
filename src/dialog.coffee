$ = require 'jqueryify'

# Use it like this:
#
# d = new Dialog
#   title: 'Hey'
#   content: 'What's up?'
#   buttons: [
#     {'Nothing': null}
#     {'Something': true}
#   ]
#   callback: (value) -> alert "You must be very busy" if value?
#
# d.promise.then (value) -> console.log 'Responded with', value

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
        @onClick()

    onClick: ->
      # Override this.

  title: ''
  content: 'Lorem ipsum dolor sit amet.'
  buttons: null
  callback: null

  className: 'dialog'

  el: null
  underlay: null

  deferred: null
  promise: null

  constructor: (params = {}) ->
    @[property] = value for own property, value of params
    @buttons ?= [new @constructor.Button label: 'OK', value: true]

    @el ?= $("""
      <div class="#{@className}-underlay">
        <div class="#{@className}">
          <header></header>
          <div class="content"></div>
          <footer></footer>
        </div>
      </div>
    """)

    @el.appendTo 'body'

  render: =>
    @el.find('header').html @title

    contentContainer = @el.find '.content'
    if @content instanceof $
      contentContainer.append @content
    else
      contentContainer.append $("<p>#{@content}</p>")

    @el.find('footer').empty

    for button, i in @buttons
      unless button instanceof @constructor.Button
        # Convert {label: value} button descriptions to Button instances
        for own label, value of button
          @buttons[i] = new @constructor.Button {label, value}
      @buttons[i].dialog = @
      @buttons[i].el.appendTo @el.find 'footer'

  open: =>
    @render()

    @el.addClass 'open'
    @deferred = new $.Deferred
    @deferred.then @callback if @callback?
    @deferred.then @close
    @promise = @deferred.promise()

  close: =>
    @el.removeClass 'open'
    @deferred = null
    @promise = null

module.exports = Dialog
