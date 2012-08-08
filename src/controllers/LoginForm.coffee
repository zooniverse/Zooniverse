define (require, exports, module) ->
  $ = require 'jQuery'
  Spine = require 'Spine'
  User = require 'zooniverse/models/User'
  templates = require 'zooniverse/views/LoginForm'


  class BaseForm extends Spine.Controller
    events:
      submit: 'onSubmit'
      keydown: 'onInputChange'
      change: 'onInputChange'

    elements:
      '.errors': 'errors'
      'input[name="username"]': 'usernameField'
      'input[name="email"]': 'emailField'
      'input[name="password"]': 'passwordField'
      'input[name="password-confirm"]': 'passwordConfirmField'
      'input[name="policy"]': 'policyCheckbox'
      'button[type="submit"]': 'submitButton'
      '.progress': 'progress'
      'input[required]': 'requiredInputs'

    constructor: ->
      super
      @html @template

      User.bind 'sign-in', @onSignIn

      @onInputChange() # Disable submit buttons
      @onSignIn() # In case we're already logged in

    onSubmit: (e) =>
      e.preventDefault()

      @errors.hide()
      @errors.empty()

      @progress.show()

    onInputChange: =>
      # Only allow submit if all required fields are filled in.
      setTimeout =>
        allFilledIn = Array::every.call @requiredInputs, (el) ->
          if el.type is 'checkbox'
            el.checked
          else
            !!el.value

        @submitButton.attr disabled: not allFilledIn

    onError: (error) =>
      @progress.hide()
      @errors.append error
      @errors.show()

    onSignIn: =>
      @progress.hide()


  class SignInForm extends BaseForm
    className: 'sign-in'
    template: templates.signIn

    onSubmit: =>
      super

      auth = User.authenticate
        username: @usernameField.val()
        password: @passwordField.val()

      # Auth errors are specific to the instance,
      # but successes are listened to by all instances.
      auth.fail @onError

    onSignIn: =>
      super
      @usernameField.add(@passwordField).val ''


  class SignUpForm extends BaseForm
    className: 'sign-in'
    template: templates.signUp

    onSubmit: =>
      super

      unless @passwordField.val() is @passwordConfirmField.val()
        @onError 'Both passwords must match!'
        @passwordField.focus()
        return

      signUp = User.signUp
        username: @usernameField.val()
        email: @emailField.val()
        password: @passwordField.val()

      signUp.fail @onError


  class ResetForm extends BaseForm
    className: 'reset'
    template: templates.reset

    onSubmit: =>
      # TODO

  class SignOutForm extends BaseForm
    className: 'sign-out'
    template: templates.signOut

    onSubmit: =>
      super
      User.deauthenticate()

    onSignIn: =>
      super
      @el.find('.current').html User.current?.name || ''


  class LoginForm extends Spine.Controller
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

      @signInForm = new SignInForm el: @signInContainer
      @signUpForm = new SignUpForm el: @signUpContainer
      # @resetForm = new ResetForm el: @resetContainer
      @signInForms = $()
        .add @signInContainer
        .add @signUpContainer
        .add @resetContainer

      @signOutForm = new SignOutForm el: @signOutContainer

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
        @signInForms.hide()
        @signInPickers.hide()
        @signOutContainer.show()
      else
        @signIn()
        @signInPickers.show()
        @signOutContainer.hide()


  module.exports = LoginForm
