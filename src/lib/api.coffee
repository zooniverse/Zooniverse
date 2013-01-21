window.zooniverse ?= {}

ProxyFrame = window.zooniverse.ProxyFrame || require './proxy-frame'
$ = window.jQuery

id = -1

class Api
  @current: null

  project: '.'

  headers: {}
  proxy: null
  ready: false

  constructor: ({host, path, @project}) ->
    @proxy = new ProxyFrame {host, path}
    @select()

  request: (type, url, data, done, fail) ->
    if typeof data is 'function'
      [fail, done, data] = [done, data, null]

    @proxy.send {type, url, data, @headers}, done, fail

  get: ->
    @request 'get', arguments...

  getJSON: ->
    @request 'getJSON', arguments...

  post: ->
    @request 'post', arguments...

  put: ->
    @request 'put', arguments...

  delete: ->
    @request 'delete', arguments...

  select: ->
    @constructor.current = @

window.zooniverse.Api = Api
module?.exports = Api
