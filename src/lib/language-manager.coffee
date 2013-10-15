EventEmitter = window.zooniverse?.EventEmitter || require './event-emitter'

$ = window.jQuery
HTML = $(document.body.parentNode)
DEFAULT_LANGUAGE_CODE = 'en'

class LanguageManager extends EventEmitter
  @current: null

  availableLanguages: {}
  preferredLanguage: null

  constructor: ->
    super

    unless @preferredLanguage = (try location.search.match(/lang=([\$|\w]+)/)[1])
      @preferredLanguage ||= localStorage.preferredLanguage if localStorage.preferredLanguage?
      @preferredLanguage ||= DEFAULT_LANGUAGE_CODE

    HTML.attr 'data-language', @preferredLanguage

    @select()
    @setLanguage @preferredLanguage

  getAvailableLanguages: ->
    return window.DEFINE_ZOONIVERSE_LANGUAGES || {'en': 'English'}

  getPreferredLanguage: ->
    return @preferredLanguage

  setLanguage: (languageCode, callback) ->
    request = $.getJSON "./translations/#{ languageCode }.json"
    request.done (data) =>
      @preferredLanguage = languageCode
      localStorage.preferredLanguage = @preferredLanguage
      localStorage.langaugeStrings = JSON.stringify data

      @trigger 'language-fetched', data
      callback? arguments...

    # When specified language isn't available, for whatever reason.
    request.fail =>
      @trigger 'language-fetch-fail'
      callback? arguments...

  select: ->
    @constructor.current = @
    @trigger 'select'

window.zooniverse ?= {}
window.zooniverse.lib ?= {}
window.zooniverse.lib.LanguageManager = LanguageManager
module?.exports = LanguageManager
