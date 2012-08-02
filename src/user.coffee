Api = require 'api'
ProxyFrame = require 'proxy_frame'

class User
  @current = null
  
  @fetch: (callback) ->
    Api.getJSON '/current_user', (result) ->
      console.info arguments
      User.current = if result.success then new User(result) else null
      User.setAuthHeaders()
      callback? User.current
  
  @setAuthHeaders: ->
    if User.current
      auth = base64.encode "#{ User.current.name }:#{ User.current.apiKey }"
      ProxyFrame.headers['Authorization'] = "Basic #{ auth }"
    else
      delete ProxyFrame.headers['Authorization']
  
  constructor: (attrs) ->
    delete attrs['success']
    @[key] = val for key, val of attrs


module.exports = User
