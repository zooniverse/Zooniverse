window.zooniverse ?= {}
window.zooniverse.controllers ?= {}
window.zooniverse.views ?= {}

BaseController = zooniverse.controllers.BaseController || require './base-controller'
template = zooniverse.views.dialog || require '../views/dialog'
translate = zooniverse.translate || require '../lib/translate'

class Dialog extends BaseController
  warning: false
  error: false

  content: ''

  className: 'zooniverse-dialog'
  template: template

  events:
    'click button[name="close-dialog"]': 'hide'
    'keydown': 'onKeyDown'

  elements:
    '.dialog': 'contentContainer'

  constructor: ->
    super

    @el.css display: 'none' # Start hidden
    @el.addClass 'warning' if @warning
    @el.addClass 'error' if @error
    
    @el.attr 'role', 'dialog'
    @el.attr 'aria-hidden', 'true'
    
    @contentContainer.append @content

    @el.appendTo document.body

  onKeyDown: ({which}) ->
    @hide() if which is 27 # ESC

  show: ->
    translate.refresh element for element in @el.get(0).querySelectorAll "[#{translate.attr}]"
    @el.css display: ''
    @el.attr 'aria-hidden', 'false'
    setTimeout => @el.addClass 'showing'
    
    @focussedElement = window.jQuery ':focus'

    @contentContainer.find('input, textarea, select').first().focus()

  hide: ->
    @el.removeClass 'showing'
    setTimeout (=> 
      @el.css display: 'none'
      @el.attr 'aria-hidden', 'true'
      @focussedElement.focus()
    ), 500

window.zooniverse.controllers.Dialog = Dialog
module?.exports = Dialog
