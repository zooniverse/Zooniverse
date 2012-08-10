TopBar = require './controllers/top_bar'

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