window.zooniverse ?= {}
window.zooniverse.models ?= {}

EventEmitter = zooniverse.EventEmitter || require '../lib/event-emitter'
Api = zooniverse.Api || require '../lib/api'
base64 = window.base64 || require '../vendor/base64'

class User extends EventEmitter
  @current: null

  @fetch: (data) =>
    fetcher = Api.current.getJSON "/projects/#{Api.current.project}/current_user", arguments...
    fetcher.always @onFetch
    fetcher

  @login: ({username, password}) ->
    login = Api.current.getJSON "/projects/#{Api.current.project}/login", arguments...
    login.done @onFetch
    login.fail @onFail

    login

  @logout: ->
    logout = Api.current.getJSON "/projects/#{Api.current.project}/logout", arguments...
    logout.always @onFetch
    logout

  @signup: ({username, password, email}) ->
    signup = Api.current.getJSON "/projects/#{Api.current.project}/signup", arguments...
    signup.always @onFetch
    signup

  @onFetch: (result) =>
    original = @current

    if result.success and 'name' of result and 'api_key' of result
      @current = new @ result
    else
      @current = null

    if @current
      auth = base64.encode "#{@current.name}:#{@current.api_key}"
      Api.current.headers['Authorization'] = "Basic #{auth}"
    else
      delete Api.current.headers['Authorization']

    @trigger 'change', [@current] unless @current is original
    @trigger 'sign-in-error', result.message unless result.success

  @onFail: =>
    @trigger 'sign-in-failure'

  id: ''
  zooniverse_id: ''
  api_key: ''
  name: ''
  avatar: ''
  project: null

  constructor: (params = {}) ->
    @[property] = value for own property, value of params when property of @

window.zooniverse.models.User = User
module?.exports = User
