LoginForm = require './controllers/base_form'

describe 'BaseForm', ->
  beforeEach ->
    @loginForm = new BaseForm

  describe '#onSubmit', ->
    beforeEach ->
      @loginForm.onSubmit()

    it 'should show a progress indicator', ->
      progress = @loginForm.progress.css('display')
      expect(progress).not.toBe 'hide'

    it 'forgets any previous errors', ->
      errors = @loginFormel.errors.text()
      expect(errors).toBe ""

    it 'submits a username and password to the authentication iframe', ->

  describe '#onErrror', ->
    it 'shows an error', ->
      errors = @loginForm.errors.text()
      expect(erros).not.toBe ""

    it 'hides the progress indicator', ->
      progress = @loginForm.progress.css('display')
      expect(progress).toBe 'hide'

  describe 'when given a bad username/password combo', ->
    it 'gets an "error" class', ->

    it 'loses its "waiting" class', ->

    it 'displays the error', ->

  describe 'on successful login', ->
    it 'updates the logged in username', ->

    it 'clears the login form', ->
