EventEmitter = window.zooniverse?.EventEmitter || require './event-emitter'
$ = window.jQuery

DEFAULT_LANGUAGE_CODE = 'en'

class LanguageManager extends EventEmitter
  @current: null

  translations: null # {CODE: label: LANGUAGE, strings: {STRINGS}/JSON_URL'}

  constructor: ({@translations, code, strings} = {}) ->
    @translations ?= window.AVAILABLE_TRANSLATIONS || {}

    localCode = try localStorage.getItem 'zooniverse-language-code'
    localStrings = JSON.parse try localStorage.getItem 'zooniverse-language-strings'

    if localCode? and localStrings?
      setTimeout =>
        @trigger 'change-language', [localCode, localStrings]

    code ||= try location.search.match(/lang=([\$|\w]+)/)[1]
    code ||= localCode
    code ||= navigator.language?.split('-')[0]
    code ||= navigator.userLanguage?.split('-')[0]
    code ||= DEFAULT_LANGUAGE_CODE

    @strings ||= localStrings
    @strings ||= {}

    @constructor.current = @

    setTimeout =>
      @setLanguage code

  setLanguage: (code, callback) ->
    if code of @translations
      if typeof @translations[code]?.strings is 'string'
        request = $.getJSON @translations[code].strings

        request.done (data) =>
          @translations[code].strings = data
          @setLanguage code, callback

        request.fail =>
          @trigger 'language-fetch-fail'
          callback? arguments...

      else
        localStorage.setItem 'zooniverse-language-code', code
        localStorage.setItem 'zooniverse-language-strings', JSON.stringify @translations[code].strings

        @trigger 'change-language', [code, @translations[code].strings]
        callback? @currentStrings

window.zooniverse ?= {}
window.zooniverse.lib ?= {}
window.zooniverse.lib.LanguageManager = LanguageManager
module?.exports = LanguageManager
