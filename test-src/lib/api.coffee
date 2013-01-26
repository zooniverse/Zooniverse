Api = window.zooniverse.Api
ProxyFrame = window.zooniverse.ProxyFrame

describe 'Api', ->
  describe 'with an available host', ->
    before ->
      @api = new Api
        project: 'test'
        host: "#{location.protocol}//#{location.host}"
        path: '/test/helpers/proxy#for-api-tests'

    after ->
      @api.destroy()

    it 'creates a new ProxyFrame', ->
      expect(@api.proxyFrame.el.parent()).to.match 'body'

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
      @api = new Api
        projecy: 'test'
        host: "#{location.protocol}//#{location.host}"
        path: '/bad-path-for-api-tests'
        loadTimeout: 100

    after ->
      @api.destroy()

    it 'rejects a GET request immediately', (done) ->
      @api.get '/marco', {}, null, (response) ->
        expect(response).to.equal ProxyFrame.REJECTION
        done()

    it 'rejects a POST request immediately', (done) ->
      @api.post '/marco', {}, null, (response) ->
        expect(response).to.equal ProxyFrame.REJECTION
        done()

    it 'rejects a PUT request immediately', (done) ->
      @api.put '/marco', {}, null, (response) ->
        expect(response).to.equal ProxyFrame.REJECTION
        done()

    it 'rejects a DELETE request immediately', (done) ->
      @api.delete '/marco', {}, null, (response) ->
        expect(response).to.equal ProxyFrame.REJECTION
        done()
