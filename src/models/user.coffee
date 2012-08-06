Model = require './model'
Api = require '../api'
ProxyFrame = require '../proxy_frame'

class User extends Model
  @configure 'User'
  
  @fetch: ->
    fetcher = Api.getJSON '/current_user', (result) =>
      User.current = if result.success
        delete result.success
        new User result
      else
        null
    
    fetcher.always @setAuthHeaders
    fetcher
  
  @setAuthHeaders: ->
    if User.current
      auth = base64.encode "#{ User.current.name }:#{ User.current.apiKey }"
      ProxyFrame.headers['Authorization'] = "Basic #{ auth }"
    else
      delete ProxyFrame.headers['Authorization']

module.exports = User
