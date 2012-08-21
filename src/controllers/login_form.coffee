$ = require 'jqueryify'
Controller = require './controller'
Form = require './base_form'
User = require '../models/user'
templates = require '../views/login_form'

class LoginForm extends Controller
  className: 'zooniverse-login-form'

  events:
    'click button[name="sign-in"]': 'signIn'
    'click button[name="sign-up"]': 'signUp'
    'click button[name="reset"]': 'reset'

  elements:
    '.sign-in': 'signInContainer'
    '.sign-up': 'signUpContainer'
    '.reset': 'resetContainer'
    '.picker': 'signInPickers'
    'button[name="sign-in"]': 'signInButton'
    'button[name="sign-up"]': 'signUpButton'
    'button[name="reset"]': 'resetButton'
    '.picker button': 'pickerButtons'
    '.sign-out': 'signOutContainer'

  constructor: ->
    super
    @html templates.login

    @signInForm = new Form.SignInForm el: @signInContainer
    @signUpForm = new Form.SignUpForm el: @signUpContainer
    # @resetForm = new ResetForm el: @resetContainer
    @signInForms = $()
      .add @signInContainer
      .add @signUpContainer
      .add @resetContainer

    @signOutForm = new Form.SignOutForm el: @signOutContainer

    User.bind 'sign-in', @onSignIn
    @onSignIn()

  signIn: =>
    @signInForms.hide()
    @signInContainer.show()

    @pickerButtons.show()
    @signInButton.hide()

  signUp: =>
    @signInForms.hide()
    @signUpContainer.show()

    @pickerButtons.show()
    @signUpButton.hide()

  reset: =>
    @signInForms.hide()
    @resetContainer.show()

    @pickerButtons.show()
    @resetButton.hide()

  onSignIn: =>
    if User.current
      @el.addClass 'signed-in'
      @signInForms.hide()
      @signInPickers.hide()
      @signOutContainer.show()
    else
      @el.removeClass 'signed-in'
      @signIn()
      @signInPickers.show()
      @signOutContainer.hide()

module.exports = LoginForm
