BaseModel = zooniverse.models.BaseModel

describe 'BaseModel', ->
  beforeEach ->
    class @ModelClass extends BaseModel
    window.MC = @ModelClass

  it 'keeps track of its instances', ->
    expect(@ModelClass.count()).to.equal 0

    instance = new @ModelClass

    expect(@ModelClass.instances[0]).to.equal instance
    expect(@ModelClass.count()).to.equal 1

    instance.destroy()

    expect(@ModelClass.count()).to.equal 0
