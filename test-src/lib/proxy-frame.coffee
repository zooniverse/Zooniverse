ProxyFrame = zooniverse.ProxyFrame

describe 'ProxyFrame', ->
  it 'creates a new iframe', ->
    @proxyFrame = new ProxyFrame
      host: "#{location.protocol}//#{location.host}"
      path: '/test/helpers/proxy'

    expect(@proxyFrame.el.parent()).to.match 'body'

  it 'queues requests before it\'s ready', ->
    @proxyFrame.send url: '/marco'

    @inQueue = @proxyFrame.queue[0]
    expect(@inQueue.url).to.equal '/marco'
    expect(@proxyFrame.deferreds[@inQueue.id]).to.exist

  it 'marks itself ready', (done) ->
    if @proxyFrame.ready
      done()
    else
      @proxyFrame.on 'ready', ->
        done()

  it 'resolves deferreds in the queue when ready', (done) ->
    @proxyFrame.deferreds[@inQueue.id].done ->
      done()

  it 'can send a request and receives a response', (done) ->
    @proxyFrame.send url: '/marco', (response) ->
      done() if response is 'polo'

  it 'removes its iframe when destroyed', ->
    @proxyFrame.destroy()
    expect(@proxyFrame.el.parent()).not.to.exist

  describe 'when the back end is unavailable', ->
    it 'marks itself failed', (done) ->
      @badProxyFrame = new ProxyFrame
        host: "#{location.protocol}//#{location.host}"
        path: '/this-doesnt-exist'
        loadTimeout: 100

      setTimeout (=> done() if @badProxyFrame.failed), 200

    it 'rejects attempted sends', (done) ->
      @badProxyFrame.send url: '/marco', null, -> done()
