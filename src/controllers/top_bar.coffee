$ = require 'jqueryify'
{delay, remove} = require '../util'

User = require '../models/user'
Controller = require './controller'
LoginForm = require './login_form'
template = require '../views/top_bar'

class TopBar extends Controller
  @instance: null

  languages: null

  langMap:
    en: 'English'
    po: 'Polski'
    de: 'Deutsche'

  dropdownsToHide: null

  className: 'zooniverse-top-bar'
  template: template

  app: null

  events:
    'mouseenter .z-dropdown': 'onDropdownEnter'
    'mouseleave .z-dropdown': 'onDropdownLeave'
    'click .z-accordion > :first-child': 'onAccordionClick'
    'click .z-languages a': 'changeLanguage'

  elements:
    '.z-languages > :first-child': 'languageLabel'
    '.z-languages :last-child': 'languageList'
    '.z-login > :first-child': 'usernameContainer'
    '.z-login > :last-child': 'loginFormContainer'

  constructor: (options) ->
    return @constructor.instance if @constructor.instance?
    @constructor.instance = @

    @languages = options.languages
    @dropdownToHide = options.dropdownsToHide
    @app = options.app

    super
    @dropdownsToHide = []
    @html @template

    dropdownContainers = @el.find('.z-dropdown').children ':last-child'
    dropdownContainers.css display: 'none', opacity: 0

    accordionContainers = @el.find '.z-accordion > :last-child'
    accordionContainers.css height: 0, opacity: 0

    @updateLanguages()

    User.bind 'create', @updateLogin
    new LoginForm el: @loginFormContainer

    @updateLogin()

    @el.find(':last-child').addClass 'last-child'

  updateLanguages: =>
    @languageLabel.empty()
    @languageList.empty()
    for lang in @languages
      @languageLabel.append """
        <span lang="#{lang}">#{lang.toUpperCase()}</span>
      """

      @languageList.append """
        <li><a href="##{lang}">#{lang.toUpperCase()} <em>#{@langMap[lang]}</em></a></li>
      """

  updateLogin: =>
    @usernameContainer.html User.current?.name || 'Sign in'

  onDropdownEnter: (e) ->
    target = $(e.currentTarget)
    container = target.children().last()

    remove target, from: @dropdownsToHide

    container.css display: ''
    container.stop().animate opacity: 1, 1

  onDropdownLeave: (e) ->
    target = $(e.currentTarget)
    container = target.children().last()

    @dropdownsToHide.push target

    delay 1, =>
      return unless target in @dropdownsToHide
      container.stop().animate opacity: 0, 1, =>
        delay => container.css display: 'none'

  onAccordionClick: (e) ->
    target = $(e.currentTarget).parent()
    container = target.children().last()

    closed = container.height() is 0

    if closed
      container.css height: ''

      naturalHeight = container.height()
      container.css height: 0
      container.animate height: naturalHeight, opacity: 1
    else
      container.animate height: 0, opacity: 0

  changeLanguage: (e) ->
    e.preventDefault()
    lang = e.currentTarget.hash.slice -2
    @el.trigger 'request-translation', lang

module.exports = TopBar
