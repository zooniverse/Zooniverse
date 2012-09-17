TopBar = require './controllers/top_bar'
User = require './models/user'

describe 'TopBar', ->
  beforeEach ->
    @topBar = new TopBar
      languages:
        en: 'English'
        fr: 'Français'
      app: "test"
      appName: "Test App"

  it 'should be instantiable', ->
    expect(@topBar).not.toBeNull()

  describe '#initLanguages', ->
    it 'should add a node for each language in @langauges', ->
      @topBar.initLanguages()
      expect(@topBar.langSelect.val()).toBe "en"

  describe '#logIn', ->
    it 'should call the user login method', ->
      spyOn(User, 'login')
      @topBar.el.find('input[name="username"]').val 'test'
      @topBar.el.find('input[name="password"]').val 'test'
      @topBar.logIn()
      expect(User.login).toHaveBeenCalledWith
        username: 'test'
        password: 'test'

  describe '#signIn', ->
    it 'should activate an alert with signUp form', ->