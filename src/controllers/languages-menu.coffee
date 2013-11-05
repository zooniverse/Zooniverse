Controller = window.zooniverse?.controllers?.BaseController || require './base-controller'
Dropdown = window.zooniverse?.controllers?.Dropdown || require './dropdown'
LanguageManager = window.zooniverse?.lib?.Language || require '../lib/language-manager'
template = window.zooniverse?.views?.languagesMenu || require '../views/languages-menu'

$ = window.jQuery

class LanguagesMenu extends Controller
  className: 'zooniverse-languages-menu'
  template: template

  events:
    'click button[name="language"]': 'onClickLanguageButton'

  constructor: ->
    @availableLanguages = LanguageManager.current?.getAvailableLanguages()
    @preferredLanguage = LanguageManager.current?.getPreferredLanguage()

    super

    LanguageManager.on 'language-fetched', (e, languageCode) =>
      @setLanguageButton languageCode

  onClickLanguageButton: (e) =>
    target = $(e.currentTarget)
    LanguageManager.current?.setLanguage target.val(), =>
      @setLanguageButton target.val()

  setLanguageButton: (languageCode) ->
    target = @el.find('button[value="' + languageCode + '"]')

    if target.length
      buttons = @el.find 'button[name="language"]'
      buttons.removeClass 'active'
      target.addClass 'active'


window.zooniverse ?= {}
window.zooniverse.controllers ?= {}
window.zooniverse.controllers.LanguagesMenu
module?.exports = LanguagesMenu
