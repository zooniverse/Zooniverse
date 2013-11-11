EventEmitter = zooniverse.EventEmitter
sinon = window.sinon

describe 'EventEmitter', ->
  describe 'the class', ->
    beforeEach ->
      class @ExtendedClass extends EventEmitter
      @spy = sinon.spy()

    it 'can bind and trigger events', ->
      @ExtendedClass.on 'foo', (e, args...) => @spy args...
      @ExtendedClass.trigger 'foo', ['bar']
      expect(@spy).to.have.been.calledWith 'bar'

    it 'can remove events', ->
      @ExtendedClass.on 'foo', @spy
      @ExtendedClass.off 'foo', @spy
      @ExtendedClass.trigger 'foo'
      expect(@spy).not.to.have.been.called

    it 'can bind an event once', ->
      @ExtendedClass.one 'foo', (e, args...) => @spy args...
      @ExtendedClass.trigger 'foo', 'bar'
      @ExtendedClass.trigger 'foo', 'boo'
      @ExtendedClass.trigger 'foo', 'far'
      expect(@spy).to.have.been.calledOnce
      expect(@spy).to.have.been.calledWith 'bar'

  describe 'the instance', ->
    beforeEach ->
      class @ExtendedClass extends EventEmitter
      @instance = new @ExtendedClass
      @spy = sinon.spy()

    it 'can bind and trigger events', ->
      @instance.on 'foo', (e, args...) => @spy args...
      @instance.trigger 'foo', ['bar']
      expect(@spy).to.have.been.calledWith 'bar'

    it 'passes triggers up to its class', ->
      @ExtendedClass.on 'foo', (e, args...) => @spy args...
      @instance.trigger 'foo', ['bar']
      expect(@spy).to.have.been.calledWith @instance, 'bar'

    it 'can remove events', ->
      @instance.on 'foo', @spy
      @instance.off 'foo', @spy
      @instance.trigger 'foo', ['bar']
      expect(@spy).not.to.have.been.calledWith 'bar'

    it 'can bind an event once', ->
      @instance.one 'foo', (e, args...) => @spy args...
      @instance.trigger 'foo', ['bar']
      @instance.trigger 'foo', ['boo']
      @instance.trigger 'foo', ['far']
      expect(@spy).to.have.been.calledOnce
      expect(@spy).to.have.been.calledWith 'bar'

    it 'no longer functions once destroyed', ->
      @instance.on 'foo', @spy
      @instance.destroy()
      @instance.trigger 'foo'
      expect(@spy).not.to.have.been.called
