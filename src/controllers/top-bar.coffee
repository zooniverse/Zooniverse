window.zooniverse ?= {}
window.zooniverse.controllers ?= {}
window.zooniverse.views ?= {}
window.zooniverse.lib ?= {}
window.zooniverse.models ?= {}

BaseController = zooniverse.controllers.BaseController || require './base-controller'
loginDialog = zooniverse.controllers.loginDialog || require './login-dialog'
signupDialog = zooniverse.controllers.signupDialog || require './signup-dialog'
template = zooniverse.views.topBar || require '../views/top-bar'
Dropdown = zooniverse.controllers.Dropdown || require './dropdown'
GroupsMenu = zooniverse.controllers.GroupsMenu || require './groups-menu'
LanguageManager = zooniverse.LanguageManager || require '../lib/language-manager'
LanguagesMenu = zooniverse.controllers.LanguagesMenu || require './languages-menu'
Api = zooniverse.Api || require '../lib/api'
User = zooniverse.models.User || require '../models/user'

defaultTalkProfileHref = "http://talk.#{ location.hostname.replace /^www\./, '' }/#/profile"

class TopBar extends BaseController
  className: 'zooniverse-top-bar'
  template: template
  messageCheckTimeout: 2 * 60 * 1000
  talkProfileHref: defaultTalkProfileHref

  events:
    'click button[name="sign-in"]': 'onClickSignIn'
    'click button[name="sign-up"]': 'onClickSignUp'
    'click button[name="sign-out"]': 'onClickSignOut'

  elements:
    '.current-user-name': 'currentUserName'
    'button[name="groups"]': 'groupsMenuButton'
    'button[name="languages-menu-toggle"]': 'languagesMenuButton'
    '.message-count': 'messageCount'
    '.avatar img': 'avatarImage'
    '.group': 'currentGroup'

  constructor: ->
    super

    @groupsMenu = new GroupsMenu
    @groupsDropdown = new Dropdown
      button: @groupsMenuButton.get 0
      buttonPinning: [1, 1]
      menu: @groupsMenu.el.get 0
      menuClass: 'from-top-bar'
      menuPinning: [1, 0]

    @el.toggleClass 'has-languages', LanguageManager.current?

    if LanguageManager.current?
      @onLanguageChange()
      LanguageManager.on 'change-language', @onLanguageChange

      @languagesMenu = new LanguagesMenu()
      @languagesDropdown = new Dropdown
        button: @languagesMenuButton.get 0
        buttonPinning: [1, 1]
        menu: @languagesMenu.el.get 0
        menuClass: 'from-top-bar'
        menuPinning: [1, 0]

    User.on 'change', @onUserChange
    User.on 'change-group', @onUserChangeGroup

  onClickSignIn: ->
    signupDialog.hide()
    loginDialog.show()

  onClickSignUp: ->
    loginDialog.hide()
    signupDialog.show()

  onClickSignOut: ->
    User.logout()

  onUserChange: (e, user) =>
    @el.toggleClass 'signed-in', user?
    @el.toggleClass 'has-groups', user?.user_groups?.length > 0
    @onUserChangeGroup e, user?, user?.user_group_id
    @getMessages()
    @currentUserName.html user?.name || ''
    @avatarImage.attr src: user?.avatar

  getMessages: =>
    if User.current?
      Api.current.get '/talk/messages/count', (messages) =>
        @el.toggleClass 'has-messages', messages isnt 0
        @messageCount.html messages
        setTimeout @getMessages, @messageCheckTimeout

    else
      @el.removeClass 'has-messages'
      @messageCount.html '0'

  onUserChangeGroup: (e, user, group) =>
    @el.toggleClass 'group-participant', group?

  onLanguageChange: =>
    @languagesMenuButton.html LanguageManager.current?.languageLabel()

window.zooniverse.controllers.TopBar = TopBar
module?.exports = TopBar
