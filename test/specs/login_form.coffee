LoginForm = require './controllers/login_form'
User = require '../models/user'

describe 'LoginForm', ->
  beforeEach ->
    @loginForm = new LoginForm

  describe '#signIn', ->
    beforeEach ->
      @loginForm.signIn()

    it 'should hide the signup form', ->
      signup = @loginForm.signUpContainer.css('display')
      expect(signup).toBe 'none'

    it 'should display the signin form', ->
      signin = @loginForm.signInContainer.css('display')
      expect(signin).not.toBe 'none'

    it 'should hide the sign in button', ->
      signinButton = @loginForm.signInButton.css('display')
      expect(signinButton).toBe 'none'

  describe '#signUp', ->
    beforeEach ->
      @loginForm.signUp()

    it 'should hide the signin form', ->
      signin = @loginForm.signInContainer.css('display')
      expect(signin).toBe 'none'

    it 'should display the signup form', ->
      signup = @loginForm.signUpContainer.css('display')
      expect(signup).not.toBe 'none'

    it 'should hide the sign up button', ->
      signupButton = @loginForm.signUpButton.css('display')
      expect(signupButton).toBe 'none'

  describe '#onSignIn', ->
    describe 'a user is signed in', ->
      beforeEach ->
        User.current = new User
        @loginForm.onSignIn()

      it 'should have a "signed-in" class', ->
        expect(@loginForm.el.hasClass 'signed-in').toBeTruthy()

      it 'should hide all sign in forms', ->
        signins = @loginForm.signInForms.css('display')
        expect(signins).toBe 'none'

      it 'should hide all pickers', ->
        pickers = @loginForm.signInPickers.css('display')
        expect(pickers).toBe 'none'

      it 'should display the signout form', ->
        signout = @loginForm.signOutContainer.css('display')
        expect(signout).not.toBe 'none'

    describe 'no user is signed in', ->
      beforeEach ->
        User.current = null

      it 'should call #signIn', ->
        spyOn(@loginForm, 'signIn')
        @loginForm.onSignIn()
        expect(@loginForm.signIn).toHaveBeenCalled()

      it 'should not have a "signed-in" class', ->
        expect(@loginForm.el.hasClass 'signed-in').toBe false

      it 'should hide signout form', ->
        signout = @loginForm.signOutContainer.css('display')
        expect(signout).toBe 'none'
