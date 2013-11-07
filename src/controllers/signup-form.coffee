window.zooniverse ?= {}
window.zooniverse.controllers ?= {}
window.zooniverse.models ?= {}

BaseController = zooniverse.controllers.BaseController || require './base-controller'
User = zooniverse.models.User || require '../models/user'
translate = zooniverse.translate || require '../lib/translate'

class SignupForm extends BaseController
  tagName: 'form'
  className: 'zooniverse-signup-form'

  events:
    'submit*': 'onSubmit'

  elements:
    'input[name="username"]': 'usernameInput'
    'input[name="password"]': 'passwordInput'
    'input[name="email"]': 'emailInput'
    'input[name="real-name"]': 'realNameInput'
    'button[type="submit"]': 'signUpButton'
    '.error-message': 'errorContainer'

  onSubmit: ->
    @el.addClass 'loading'
    @signUpButton.attr disabled: true

    signup = User.signup
      username: @usernameInput.val()
      password: @passwordInput.val()
      email: @emailInput.val()
      real_name: @realNameInput.val()

    signup.done ({success, message}) =>
      @showError message unless success

    signup.fail =>
      @showError translate 'signInFailed'

    signup.always =>
      @el.removeClass 'loading'
      @signUpButton.attr disabled: false

  showError: (message) ->
    @errorContainer.html message

window.zooniverse.controllers.SignupForm = SignupForm
module?.exports = SignupForm
