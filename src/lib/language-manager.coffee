EventEmitter = window.zooniverse?.EventEmitter || require './event-emitter'
$ = window.jQuery

class LanguageManager extends EventEmitter
  @current: null

  translations: null # {"CODE": {label: "LANGUAGE", strings: {STRINGS: {...}} or "JSON_URL"}
  code: 'en'

  constructor: (params) ->
    @[property] = value for own property, value of params when property of @

    @translations ?= {}

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
    unless @translations[@code]?
      @code = @constructor::code

    unless @translations[@code].strings?
      @translations[@code].strings = @defaultStringsFormat()

    if typeof @translations[@code].strings is 'string'
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

  label: =>
    @translations[@code]?.label || @translations[@constructor::code]?.label

  defaultStringsFormat: =>
    "./translations/#{ @code }.json"

window.zooniverse ?= {}
window.zooniverse.LanguageManager = LanguageManager
module?.exports = LanguageManager
