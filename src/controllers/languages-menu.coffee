Controller = window.zooniverse?.controllers?.BaseController || require './base-controller'
Dropdown = window.zooniverse?.controllers?.Dropdown || require './dropdown'
LanguageManager = window.zooniverse?.LanguageManager || require '../lib/language-manager'
template = window.zooniverse?.views?.languagesMenu || require '../views/languages-menu'

class LanguagesMenu extends Controller
  className: 'zooniverse-languages-menu'
  template: template

  events:
    'click button[name="language"]': 'onClickLanguageButton'

  constructor: ->
    super
    LanguageManager.current?.on 'change-language', (e, code) =>
      @setLanguageButton code

  onClickLanguageButton: (e) =>
    LanguageManager.current?.setLanguage e.currentTarget.value
    Dropdown.closeAll()

  setLanguageButton: (code) ->
    target = @el.find('button[value="' + code + '"]')

    unless target.length is 0
      buttons = @el.find 'button[name="language"]'
      buttons.removeClass 'active'
      target.addClass 'active'

window.zooniverse ?= {}
window.zooniverse.controllers ?= {}
window.zooniverse.controllers.LanguagesMenu = LanguagesMenu
module?.exports = LanguagesMenu
