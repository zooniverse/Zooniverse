Controller = window.zooniverse?.controllers?.BaseController || require './base-controller'
Dropdown = window.zooniverse?.controllers?.Dropdown || require './dropdown'
template = window.zooniverse?.views?.languagesMenu || require '../views/languages-menu'

$ = window.jQuery
HTML = $(document.body.parentNode)

class LanguagesMenu extends Controller
  className: 'zooniverse-languages-menu'
  template: template

  events:
    'click button[name="language"]': 'onClickLanguageButton'

  constructor: ->
    unless DEFINE_ZOONIVERSE_LANGUAGES
      return

    @availableLanguages = DEFINE_ZOONIVERSE_LANGUAGES

    @preferredLanguage = try location.search.match(/lang=([\$|\w]+)/)[1]
    @preferredLanguage ||= localStorage.preferredLanguage
    @preferredLanguage ||= 'en'
    HTML.attr 'data-language', @preferredLanguage

    super

    @el.find('button[value="' + @preferredLanguage + '"]').click()

  onClickLanguageButton: (e) =>
    target = $(e.currentTarget)

    request = $.getJSON "./translations/#{ target.val() }.json"
    request.done (data) =>
      buttons = @el.find 'button[name="language"]'
      buttons.removeClass 'active'
      target.addClass 'active'

      @trigger 'language-fetched', data


window.zooniverse ?= {}
window.zooniverse.controllers ?= {}
window.zooniverse.controllers.LanguagesMenu
module?.exports = LanguagesMenu
