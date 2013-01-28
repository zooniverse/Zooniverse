window.zooniverse ?= {}
window.zooniverse.controllers ?= {}
window.zooniverse.views ?= {}

BaseController = zooniverse.controllers.BaseController || require './base-controller'
template = zooniverse.views.Dialog || require '../views/dialog'

class Dialog extends BaseController
  content: ''

  className: 'zooniverse-dialog'
  template: template

  events:
    'click button[name="close-dialog"]': 'hide'

  elements:
    '.dialog': 'contentContainer'

  constructor: ->
    super
    @hide()

    @contentContainer.append @content

    @el.appendTo document.body

  show: ->
    @el.removeClass 'hidden'

  hide: ->
    @el.addClass 'hidden'

window.zooniverse.controllers.Dialog = Dialog
module?.exports = Dialog
