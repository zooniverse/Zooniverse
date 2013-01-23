window.zooniverse ?= {}
window.zooniverse.controllers ?= {}
window.zooniverse.views ?= {}

BaseController = zooniverse.controllers.BaseController || require './base-controller'
template = zooniverse.views.topBar || require '../views/top-bar'
Api = zooniverse.api || require '../lib/api'
User = zooniverse.models.User || require '../models/user'

class TopBar extends BaseController
  className: 'zooniverse-top-bar'
  template: template

  events:
    'submit* form[name="sign-in"]': 'onSignInSubmit'
    'click* button[name="sign-up"]': 'onClickSignUp'
    'click* button[name="sign-out"]': 'onClickSignOut'

  elements:
    'input[name="username"]': 'usernameInput'
    'input[name="password"]': 'passwordInput'
    'form[name="sign-in"] button[type="submit"]': 'signInButton'
    '.error-message': 'errorContainer'
    '.current-user-name': 'currentUserName'

  constructor: ->
    super
    User.on 'change', @onUserChange
    User.on 'sign-in-error', @onSignInError
    User.on 'sign-in-failure', => @onSignInFailure

  onSignInSubmit: ->
    @el.addClass 'logging-in'
    @signInButton.attr disabled: true

    login = User.login
      username: @usernameInput.val()
      password: @passwordInput.val()

    login.always =>
      @el.removeClass 'logging-in'
      @signInButton.attr disabled: false

  onClickSignUp: ->
    alert 'TODO: Sign up dialog'

  onClickSignOut: ->
    User.logout()

  onUserChange: (e, user) =>
    @el.toggleClass 'signed-in', user?
    @usernameInput.val ''
    @passwordInput.val ''
    @errorContainer.html ''
    @currentUserName.html user?.name || ''

  onSignInError: (e, message) =>
    @errorContainer.html message

  onSignInFailure: =>
    console?.warn 'SIGN IN FAILURE'

window.zooniverse.controllers.TopBar = TopBar
module?.exports = TopBar
