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
      console.log @signInForm.errors
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
      @signInForm.usernameField.val 'test'
      @signInForm.passwordField.val 'password'
      @signInForm.passwordConfirmField.val 'password'
      @signInForm.emailField.val 'test@example.com'

    

