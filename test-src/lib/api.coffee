Api = zooniverse.Api
ProxyFrame = zooniverse.ProxyFrame

describe 'Api', ->
  describe 'with an available host', ->
    it 'creates a new ProxyFrame', ->
      @api = new Api
        project: 'test'
        host: "#{location.protocol}//#{location.host}"
        path: '/test/helpers/proxy'

      expect(@api.proxyFrame.el).to.match '.proxy-frame'

    it 'has an associated project', ->
      expect(@api.project).to.equal 'test'

    it 'marks itself as "current"', ->
      expect(Api.current).to.be @api

    it 'can make a GET request', (done) ->
      @api.get '/marco', (response) ->
        done() if response is 'polo'

    it 'can make a POST request', (done) ->
      @api.post '/marco', (response) ->
        done() if response is 'polo'

    it 'can make a PUT request', (done) ->
      @api.put '/marco', (response) ->
        done() if response is 'polo'

    it 'can make a DELETE request', (done) ->
      @api.delete '/marco', (response) ->
        done() if response is 'polo'

  describe 'with an unavailable host', ->
    before ->
      @badApi = new Api
        projecy: 'test'
        host: "#{location.protocol}//#{location.host}"
        path: '/bad-path-for-api-tests'
        loadTimeout: 100

    it 'rejects a GET request immediately', (done) ->
      @badApi.get '/marco', {}, null, (response) ->
        done() if response is ProxyFrame.REJECTION

    it 'rejects a POST request immediately', (done) ->
      @badApi.post '/marco', {}, null, (response) ->
        done() if response is ProxyFrame.REJECTION

    it 'rejects a PUT request immediately', (done) ->
      @badApi.put '/marco', {}, null, (response) ->
        done() if response is ProxyFrame.REJECTION

    it 'rejects a DELETE request immediately', (done) ->
      @badApi.delete '/marco', {}, null, (response) ->
        done() if response is ProxyFrame.REJECTION
