Form = require './controllers/base_form'
User = require '../models/user'

describe 'SignInForm', ->
  beforeEach ->
    @signInForm = new Form.SignInForm

  describe '#onSubmit', ->
    beforeEach ->
      @signInForm.usernameField.val 'test'
      @signInForm.passwordField.val 'password'
      @signInForm.onSubmit()

    it 'should show a progress indicator', ->
      progress = @signInForm.progress.css('display')
      expect(progress).not.toBe 'none'

    it 'forgets any previous errors', ->
      errors = @signInForm.errors.text()
      expect(errors).toBe ""

    it 'submits a username and password to the authentication iframe', ->
      spyOn(User, 'login').andCallThrough()
      @signInForm.onSubmit()
      expect(User.login).toHaveBeenCalledWith({username: 'test', password: 'password'})

  describe '#onErrror', ->
    beforeEach ->
      @signInForm.onError "Test Error"

    it 'shows an error', ->
      errors = @signInForm.errors.text()
      expect(errors).toBe "Test Error"

    it 'hides the progress indicator', ->
      progress = @signInForm.progress.css('display')
      expect(progress).toBe 'none'
  
  describe '#onSignIn', ->
    beforeEach ->
      @signInForm.onSignIn()

    it 'should hide the progress', ->
      progress = @signInForm.progress.css('display')
      expect(progress).toBe 'none'

describe 'SignUpForm', ->
  beforeEach ->
    @signUpForm = new Form.SignUpForm

  describe '#onSumbit', ->
    beforeEach ->
      @signUpForm.usernameField.val 'test'
      @signUpForm.passwordField.val 'password'
      @signUpForm.emailField.val 'test@example.com'

    describe 'non-matching passwords', ->
      beforeEach ->
        @signUpForm.passwordConfirmField.val 'lump-password'

      it 'should call #onError with a message', ->
        spyOn(@signUpForm, 'onError')
        @signUpForm.onSubmit()
        expect(@signUpForm.onError).toHaveBeenCalledWith('Passwords must match!')

    describe 'matching passwords', ->
      beforeEach ->
        @signUpForm.passwordConfirmField.val 'password'

      it 'should call User.signup', ->
        spyOn(User, 'signup').andCallThrough()
        @signUpForm.onSubmit()
        expect(User.signup).toHaveBeenCalledWith
          username: 'test'
          password: 'password'
          email: 'test@example.com'

describe 'SignOutForm', ->
  beforeEach ->
    @signOutForm = new Form.SignOutForm
    userCheck = false
    User.login({username: 'name', password: 'password'}).always -> userCheck = true
    waitsFor -> userCheck

  describe '#onSubmit', ->
    it 'should log the user out', ->
      spyOn(User, 'logout').andCallThrough()
      @signOutForm.onSubmit()
      expect(User.logout).toHaveBeenCalled()
