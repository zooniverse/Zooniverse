TopBar = require './controllers/top_bar'
User = require './models/user'

describe 'TopBar', ->
  beforeEach ->
    @topBar = new TopBar
      languages:
        en: 'English'
        fr: 'Français'
      app: "test"

  it 'should be instantiable', ->
    expect(@topBar).not.toBeNull()

  describe '#updateLanguages', ->
    it 'should add a node for each language in @langauges', ->
      @topBar.updateLanguages()
      expect(@topBar.languageLabel.text()).toBe "EN"

  describe '#logIn', ->
    it 'should call the user login method', ->
      spyOn(User, 'login')
      @topBar.username.val 'test'
      @topBar.password.val 'test'
      @topBar.login()
      expect(User.login).toHaveBeenCalledWith
        username: 'test'
        password: 'test'

  describe '#signIn', ->
    it 'should activate an alert with signUp form', ->