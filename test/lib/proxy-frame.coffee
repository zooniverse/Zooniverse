ProxyFrame = zooniverse.ProxyFrame
sinon = window.sinon

describe 'ProxyFrame', ->
  before ->
    @queueSpy = sinon.spy()

  it 'creates a new iframe', ->
    window.pf = @proxyFrame = new ProxyFrame
      host: "#{location.protocol}//#{location.host}"
      path: '/test/helpers/proxy'

    expect(@proxyFrame.el).to.match '.proxy-frame'
    expect(@proxyFrame.el.parent()).to.match 'body'

  it 'queues requests before it\'s ready', ->
    @proxyFrame.send url: '/marco', => @queueSpy()
    @inQueue = @proxyFrame.queue[0]
    expect(@inQueue.url).to.equal '/marco'
    expect(@proxyFrame.deferreds[@inQueue.id]).to.exist

  describe 'when the back end is available', ->
    it 'marks itself ready', (done) ->
      if @proxyFrame.ready
        done()
      else
        @proxyFrame.on 'ready', ->
          done()

    it 'resolves deferreds in the queue', (done) ->
      @proxyFrame.deferreds[@inQueue.id].done ->
        done()

    it 'sends a request and receives a response', (done) ->
      @proxyFrame.send url: '/marco', (response) ->
        done() if response is 'polo'

  describe 'when the back end is unavailable', ->
    it 'marks itself failed', (done) ->
      @badProxyFrame = new ProxyFrame
        host: "#{location.protocol}//#{location.host}"
        path: '/this-doesnt-exist'
        loadTimeout: 100

      setTimeout (=> done() if @badProxyFrame.failed), 200

    it 'rejects attempted sends', (done) ->
      @badProxyFrame.one 'response', (e, response) ->
      @badProxyFrame.send url: '/marco', null, ->
        done()
