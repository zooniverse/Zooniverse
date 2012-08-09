$ = require 'jqueryify'
User = requre '../models/user'
Controller = require './controller'
templates = require '../views/login_form'

class BaseForm extends Controller
  events:
    sumbit: 'onSubmit'
    keydown: 'onInputChange'
    change: 'onInputChange'

  elements:
    '.errors': 'errors'
    'input[name="username"]': 'usernameField'
    'input[name="email"]': 'emailField'
    'input[name="password"]': 'passwordField'
    'input[name="password-confirm"]': 'passwordCOnfirmField'
    'input[name="policy"]': 'submitButton'
    'button[type="submit"]': 'submitButton'
    '.progress': 'progress'
    'input[required]': 'requiredInputs'

  constructor: ->
    super
    @html @template

    User.bind 'signed-in', onSignIn

  onSubmit: (e) =>
    @errors.hide()
    @errors.empty()

    @progress.show()

  onError: (error) =>
    @progress.hide()

    @errors.append error
    @errors.show()

  onInputChange: =>
    # Only allow submit if all items are filled out
    setTimeout =>
      allFilledIn = Array::every.call @requiredInputs, (el) ->
        if el.type is 'checkbox'
          el.checked
        else
          !!el.value

      @submitButton.attr disabled: not allFilledIn

  onSignIn: =>
    @progress.hide()

class SignInForm extends BaseForm
  className: 'sign-in'
  template: templates.signIn

module.exports = SignInForm
