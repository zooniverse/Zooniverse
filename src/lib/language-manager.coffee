EventEmitter = window.zooniverse?.EventEmitter || require './event-emitter'
$ = window.jQuery

class LanguageManager extends EventEmitter
  @current: null

  translations: null # {"CODE": {label: "LANGUAGE", strings: {STRINGS: {...}} or "JSON_URL"}
  code: 'en'

  constructor: ({@translations, @code} = {}) ->
    @translations ?= {}

    if window.AVAILABLE_TRANSLATIONS?
      @translations[code] = lang for code, lang of window.AVAILABLE_TRANSLATIONS

    @code ?= location.search.match(/lang=([^&]+)/)?[1]
    @code ?= localStorage.getItem 'zooniverse-language-code'
    @code ?= navigator.language?.split('-')[0]
    @code ?= navigator.userLanguage?.split('-')[0]
    @code ?= @constructor::code

    if '/' in @code or '.json' in @code
      @translations[@code] ?= label: @code, strings: @code

    @constructor.current = @

    setTimeout =>
      @setLanguage @code

  setLanguage: (@code, done, fail) ->
    if typeof @translations[@code]?.strings is 'string'
      pathToStrings = @translations[@code]?.strings

      localStrings = JSON.parse localStorage.getItem "zooniverse-language-strings-#{@code}"
      if localStrings?
        @translations[@code].strings = localStrings
        @setLanguage @code, done, fail

      request = $.getJSON pathToStrings

      request.done (data) =>
        localStorage.setItem "zooniverse-language-strings-#{@code}", JSON.stringify data
        @translations[@code].strings = data
        @setLanguage @code, done, fail

      request.fail =>
        @trigger 'language-fetch-fail'
        fail? arguments...

    else
      localStorage.setItem 'zooniverse-language-code', @code
      document.querySelector('html').lang = @code
      @trigger 'change-language', [@code, @translations[@code].strings]
      done? @code, @translations[@code].strings

  languageLabel: =>
    @translations?[@code].label

window.zooniverse ?= {}
window.zooniverse.LanguageManager = LanguageManager
module?.exports = LanguageManager
