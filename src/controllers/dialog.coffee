window.zooniverse ?= {}
window.zooniverse.controllers ?= {}
window.zooniverse.views ?= {}

BaseController = zooniverse.controllers.BaseController || require './base-controller'
template = zooniverse.views.dialog || require '../views/dialog'
translate = zooniverse.translate || require '../lib/translate'

# list of focusable elements from https://github.com/gdkraus/accessible-modal-dialog/blob/master/modal-window.js
focusableElementsSelector = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]"

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
    
    @focusableContent = @contentContainer.find('*').filter focusableElementsSelector
    Dialog.focussedElement = {}

    @el.appendTo document.body

  onKeyDown: (e) ->
    @hide() if e.which is 27 # ESC
    
    #prevent tabbing to elements outside of the dialog
    if e.which == 9
      
      focusedElement = window.jQuery ':focus'
      focusedIndex = @focusableContent.index focusedElement
      lastIndex = @focusableContent.length - 1
      
      if e.shiftKey
        # back tab
        if focusedIndex == 0 
          @focusableContent.get(lastIndex).focus()
          e.preventDefault()
      else
        # forward tab
        if focusedIndex == lastIndex
          @focusableContent.get(0).focus()
          e.preventDefault()

  show: ->
    translate.refresh element for element in @el.get(0).querySelectorAll "[#{translate.attr}]"
    @el.css display: ''
    @el.attr 'aria-hidden', 'false'
    console.log Dialog.focussedElement
    Dialog.focussedElement = window.jQuery ':focus'
    setTimeout => 
      @el.addClass 'showing'
      @contentContainer.find('input, textarea, select').first().focus()
    , 300

  hide: ->
    @el.removeClass 'showing'
    Dialog.focussedElement.focus() if Dialog.focussedElement.focus?
    console.log Dialog.focussedElement
    setTimeout => 
      @el.css display: 'none'
      @el.attr 'aria-hidden', 'true'
    , 500

window.zooniverse.controllers.Dialog = Dialog
module?.exports = Dialog
