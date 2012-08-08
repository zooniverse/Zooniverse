LoginForm = require './controllers/LoginForm'

describe 'LoginForm', ->
  beforeEach ->
    @loginForm = new LoginForm

  describe '#onSubmit', ->
    beforeEach ->
      @loginForm.onSubmit()

    it 'should show a progress indicator', ->
      progress = $('@loginForm.el p progress').css('display')
      expect(progress).not.toBe 'hide'

    it 'forgets any previous errors', ->

    it 'submits a username and password to the authentication iframe', ->

  describe 'on login error', ->
    it 'gets an "error" class', ->

    it 'loses its "waiting" class', ->

    it 'displays the error', ->

  describe 'when given a bad username/password combo', ->
    it 'gets an "error" class', ->

    it 'loses its "waiting" class', ->

    it 'displays the error', ->

  describe 'on successful login', ->
    it 'updates the logged in username', ->

    it 'clears the login form', ->
