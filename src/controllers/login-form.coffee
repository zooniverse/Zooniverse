window.zooniverse ?= {}
window.zooniverse.controllers ?= {}
window.zooniverse.views ?= {}

BaseController = zooniverse.controllers.BaseController || require './base-controller'
template = zooniverse.views.loginForm || require '../views/login-form'
Api = zooniverse.api || require '../lib/api'
User = zooniverse.models.User || require '../models/user'
enUs = zooniverse.enUs || require '../lib/en-us'

class LoginForm extends BaseController
  template: template

  events:
    'submit*': 'onSignInSubmit'
    'click* button[name="sign-up"]': 'onClickSignUp'
    'click* button[name="sign-out"]': 'onClickSignOut'

  elements:
    'input[name="username"]': 'usernameInput'
    'input[name="password"]': 'passwordInput'
    'button[type="submit"]': 'signInButton'
    'button[name="sign-out"]': 'signOutButton'
    '.error-message': 'errorContainer'

  constructor: ->
    super

    User.on 'change', =>
      @onUserChange arguments...

  onSignInSubmit: ->
    @el.addClass 'logging-in'
    @signInButton.attr disabled: true

    login = User.login
      username: @usernameInput.val()
      password: @passwordInput.val()

    login.done ({success, message}) =>
      @showError message unless success

    login.fail =>
      @showError enUs.user.signInFailed

    login.always =>
      @el.removeClass 'logging-in'

  onClickSignOut: ->
    @signOutButton.attr disabled: true
    User.logout()

  onUserChange: (e, user) ->
    @usernameInput.val user?.name || ''
    @passwordInput.val if user?.api_key || '' # Just for the dots.
    @errorContainer.html ''

    @usernameInput.attr disabled: user?
    @passwordInput.attr disabled: user?
    @signInButton.attr disabled: user?
    @signOutButton.attr disabled: not user?

  showError: (message) ->
    console.log "SHOW ERROR", message
    @errorContainer.html message

window.zooniverse.controllers.LoginForm = LoginForm
module?.exports = LoginForm
