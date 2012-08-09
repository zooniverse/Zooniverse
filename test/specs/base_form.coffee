SignInForm = require './controllers/base_form'

describe 'SignInForm', ->
  beforeEach ->
    @signInForm = new SignInForm

  describe '#onSubmit', ->
    beforeEach ->
      @signInForm.onSubmit()

    it 'should show a progress indicator', ->
      progress = @signInForm.progress.css('display')
      expect(progress).not.toBe 'none'

    it 'forgets any previous errors', ->
      errors = @signInForm.errors.text()
      expect(errors).toBe ""

    it 'submits a username and password to the authentication iframe', ->
      spyOn User, 'login'
      

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
      expect(progress).not.toBe 'none'

  describe 'when given a bad username/password combo', ->
    it 'gets an "error" class', ->

    it 'loses its "waiting" class', ->

    it 'displays the error', ->

  describe 'on successful login', ->
    it 'updates the logged in username', ->

    it 'clears the login form', ->
