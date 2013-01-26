BaseModel = zooniverse.models.BaseModel

describe 'BaseModel', ->
  beforeEach ->
    class @ModelClass extends BaseModel
      name: ''

  it 'keeps track of its instances', ->
    instance = new @ModelClass

    expect(@ModelClass.instances[0]).to.equal instance
    expect(@ModelClass.count()).to.equal 1

    instance.destroy()

    expect(@ModelClass.count()).to.equal 0

  it 'gives its instances a unique id', ->
    foo = new @ModelClass
    expect(foo.id).to.match /C_\d+/

  describe 'count', ->
    it 'returns a count of instances', ->
      new @ModelClass
      expect(@ModelClass.count()).to.equal 1

      new @ModelClass
      expect(@ModelClass.count()).to.equal 2

      new @ModelClass
      expect(@ModelClass.count()).to.equal 3

  describe 'first', ->
    it 'returns the first instace ', ->
      foo = new @ModelClass
      bar = new @ModelClass

      expect(@ModelClass.first()).to.equal foo

      foo.destroy()
      expect(@ModelClass.first()).to.equal bar

  describe 'find', ->
    it 'returns the instance with the given ID', ->
      foo = new @ModelClass id: 'foo'
      expect(@ModelClass.find 'foo').to.equal foo

  describe 'search', ->
    it 'returns the instances that match the give property values', ->
      foo = new @ModelClass name: 'foo'
      bar = new @ModelClass name: 'bar'
      expect(@ModelClass.search name: 'foo').to.eql [foo]
      expect(@ModelClass.search name: 'bar').to.eql [bar]

  describe 'destroyAll', ->
    it 'destroys all its instances', ->
      new @ModelClass
      new @ModelClass
      new @ModelClass

      @ModelClass.destroyAll()
      expect(@ModelClass.count()).to.equal 0
