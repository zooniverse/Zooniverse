LanguageManager = window.zooniverse?.LanguageManager || require './language-manager'

translate = ([tag]..., key) ->
  tag ?= 'span'
  element = document.createElement tag
  element.setAttribute translate.attr, key
  translate.refresh element
  element.outerHTML

translate.attr = 'data-zooniverse-translate'

translate.strings =
  en: window.zooniverse?.translations?.en || require '../translations/en'
  es: window.zooniverse?.translations?.es || require '../translations/es'
  fr: window.zooniverse?.translations?.fr || require '../translations/fr'
  it: window.zooniverse?.translations?.it || require '../translations/it'
  pl: window.zooniverse?.translations?.pl || require '../translations/pl'
  ru: window.zooniverse?.translations?.ru || require '../translations/ru'
  zh_tw: window.zooniverse?.translations?.zh_tw || require '../translations/zh-tw'
  zh_cn: window.zooniverse?.translations?.zh_cn || require '../translations/zh-cn'
  de: window.zooniverse?.translations?.de || require '../translations/de'
  cs: window.zooniverse?.translations?.cs || require '../translations/cs'
  ro: window.zooniverse?.translations?.ro || require '../translations/ro'
  ja: window.zooniverse?.translations?.ja || require '../translations/ja'

translate.refresh = (element, key) ->
  for {name, value} in element.attributes
    continue unless name[...translate.attr.length] is translate.attr
    continue unless value
    property = name[translate.attr.length + 1...] || 'innerHTML'
    string = translate.strings[LanguageManager.current?.code]?[value]
    string ||= translate.strings[LanguageManager.defaultLocale]?[value] # Fall back to the default language.
    string ||= value # Fall back to the key.
    if element.hasAttribute property
      element.setAttribute property, string
    else
      element[property] = string

LanguageManager.on 'change-language', ->
  translate.refresh element for element in document.querySelectorAll "[#{translate.attr}]"

window.zooniverse ?= {}
window.zooniverse.translate = translate
module?.exports = translate
