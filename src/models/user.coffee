Model = require './model'
Api = require '../api'
ProxyFrame = require '../proxy_frame'

class User extends Model
  @configure 'User'

  @project: 'Not Specified'

  @fetch: ->
    fetcher = Api.getJSON "/projects/#{ @project }/current_user", @createUser
    fetcher.always @setAuthHeaders
    fetcher.always => User.trigger('sign-in') if User.current
    fetcher

  @setAuthHeaders: ->
    if User.current
      auth = base64.encode "#{ User.current.name }:#{ User.current.api_key }"
      ProxyFrame.headers['Authorization'] = "Basic #{ auth }"
    else
      delete ProxyFrame.headers['Authorization']

  @login: ({username, password}) ->
    login = Api.getJSON "/projects/#{ @project }/login", {username, password}, @createUser
    login.always @setAuthHeaders
    login 

  @logout: ->
    logout = Api.getJSON "/projects/#{ @project }/logout", (result) ->
      User.current = null if result.success
      User.trigger 'sign-in', this
    logout.always @setAuthHeaders
    logout

  @signup: ({username, password, email}) ->
    signup = Api.getJSON "/projects/#{ @project }/signup", {username, email, password}, @createUser
    signup.always @setAuthHeaders
    signup

  @createUser: (result) ->
    User.current = if result.success
      delete result.success
      User.trigger 'sign-in', this
      new User result
    else
      User.trigger 'sign-in-error', result.message
      null

module.exports = User
