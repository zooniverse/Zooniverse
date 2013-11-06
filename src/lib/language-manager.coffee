EventEmitter = window.zooniverse?.EventEmitter || require './event-emitter'
$ = window.jQuery

DEFAULT_LANGUAGE_CODE = 'en'

class LanguageManager extends EventEmitter
  @current: null

  translations: null # {"CODE": {label: "LANGUAGE", strings: {STRINGS: {...}} or "JSON_URL"}

  constructor: ({@translations, code} = {}) ->
    @translations ?= window.AVAILABLE_TRANSLATIONS || {}

    code ||= location.search.match(/lang=(\w+)/)?[1]
    code ||= localStorage.getItem 'zooniverse-language-code'
    code ||= navigator.language?.split('-')[0]
    code ||= navigator.userLanguage?.split('-')[0]
    code ||= DEFAULT_LANGUAGE_CODE

    @constructor.current = @

    setTimeout =>
      @setLanguage code

  setLanguage: (code, done, fail) ->
    if typeof @translations[code]?.strings is 'string'
      localStrings = JSON.parse localStorage.getItem "zooniverse-language-strings-#{code}"

      if localStrings?
        @translations[code].strings = localStrings
        @setLanguage code, done, fail

      else
        request = $.getJSON @translations[code].strings

        request.done (data) =>
          localStorage.setItem "zooniverse-language-strings-#{code}", JSON.stringify data
          @translations[code].strings = data
          @setLanguage code, done, fail

        request.fail =>
          @trigger 'language-fetch-fail'
          fail? arguments...

    else
      localStorage.setItem 'zooniverse-language-code', code
      @trigger 'change-language', [code, @translations[code].strings]
      done? code, @translations[code].strings

window.zooniverse ?= {}
window.zooniverse.LanguageManager = LanguageManager
module?.exports = LanguageManager
