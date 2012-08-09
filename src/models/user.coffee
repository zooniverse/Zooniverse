Model = require './model'
Api = require '../api'
ProxyFrame = require '../proxy_frame'

class User extends Model
  @configure 'User'
  
  @fetch: ->
    fetcher = Api.getJSON '/current_user', @createUser
    fetcher.always @setAuthHeaders
    fetcher
  
  @setAuthHeaders: ->
    if User.current
      auth = base64.encode "#{ User.current.name }:#{ User.current.apiKey }"
      ProxyFrame.headers['Authorization'] = "Basic #{ auth }"
    else
      delete ProxyFrame.headers['Authorization']

  @login: (username, password) ->
    login = Api.getJSON '/login', {username, password}, @createUser
    login.always @setAuthHeaders
    login unless User.current

  @logout: ->
    logout = Api.getJSON '/logout', (result) ->
      User.current = null if result.success

    logout.always @setAuthHeaders
    logout if User.current

  @createUser: (result) ->
    User.current = if result.success
      delete result.success
      @trigger 'signed-in', User.current
      new User result
    else
      null


module.exports = User
