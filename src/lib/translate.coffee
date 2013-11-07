LanguageManager = window.zoonivers?.LanguageManager || require './language-manager'

strings =
  en: window.zooniverse?.translations?.en || require '../translations/en'
  es: window.zooniverse?.translations?.es || require '../translations/es'

KEY_ATTRIBUTE = 'data-zooniverse-translation-key'

refresh = (element, key) ->
  key ?= element.getAttribute KEY_ATTRIBUTE
  string = strings[LanguageManager.current?.code]?[key]
  string ||= strings[LanguageManager::code]?[key] # Fall back to the default language.
  string ||= key # Fall back to the key.
  element.innerHTML = string

translate = ([tag]..., key) ->
  tag ?= 'span'
  element = document.createElement tag
  element.setAttribute KEY_ATTRIBUTE, key
  refresh element, key
  element.outerHTML

LanguageManager.on 'change-language', (e, instance, code, strings) ->
  refresh element for element in document.querySelectorAll "[#{KEY_ATTRIBUTE}]"

window.zooniverse ?= {}
window.zooniverse.translate = translate
module?.exports = translate
