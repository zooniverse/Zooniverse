$ = require 'jqueryify'
_ = require 'underscore/underscore'
Message = require './message'

class FakeProxy
  send: (@message) ->
  succeed: -> @message.succeed()
  fail: -> @message.fail()

describe 'Message', ->
  beforeEach ->
    [@success, @failure, @always] = _([1..3]).map -> jasmine.createSpy()
    fakeProxy = new FakeProxy
    @message = new Message { foo: 'foo' }, fakeProxy
    @message.onSuccess @success
    @message.onFailure @failure
    @message.always @always
  
  it 'should know when it is sent', ->
    expect(@message.sent).toBe false
    @message.send()
    expect(@message.sent).toBe true
    
  it 'should know when it is delivered', ->
    expect(@message.isDelivered()).toBe false
    @message.send()
    expect(@message.isDelivered()).toBe false
    @message.proxy.succeed()
    expect(@message.isDelivered()).toBe true
  
  it 'handles success', ->
    @message.send()
    @message.proxy.succeed()
    expect(@success).toHaveBeenCalled()
    expect(@failure).not.toHaveBeenCalled()
    expect(@always).toHaveBeenCalled()
    expect(@message.isDelivered()).toBe true
  
  it 'handles failure', ->
    @message.send()
    @message.proxy.fail()
    expect(@success).not.toHaveBeenCalled()
    expect(@failure).toHaveBeenCalled()
    expect(@always).toHaveBeenCalled()
    expect(@message.isDelivered()).toBe false

