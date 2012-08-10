TopBar = require './controllers/top_bar'

describe 'TopBar', ->
  it 'should be instantiable', ->
    topBar = new TopBar
      languages:
        en: 'English'
        fr: 'French'
      app: "test"
    expect(topBar).not.toBeNull()