window.zooniverse ?= {}
window.zooniverse.models ?= {}

EventEmitter = window.zooniverse.EventEmitter || require '../lib/event-emitter'
Api = window.zooniverse.Api || require '../lib/api'
base64 = window.base64 || (require '../vendor/base64'; window.base64)

class User extends EventEmitter
  @current: false

  @fetch: =>
    @trigger 'fetching', arguments
    fetcher = Api.current.getJSON "/projects/#{Api.current.project}/current_user", arguments...
    fetcher.always @onFetch
    fetcher

  @login: ({username, password}) ->
    @trigger 'logging-in', arguments
    login = Api.current.getJSON "/projects/#{Api.current.project}/login", arguments...
    login.done @onFetch
    login.fail @onFail

    login

  @logout: ->
    @trigger 'logging-out', arguments
    logout = Api.current.getJSON "/projects/#{Api.current.project}/logout", arguments...
    logout.always @onFetch
    logout

  @signup: ({username, password, email}) ->
    @trigger 'signing-up'
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

    unless @current is original
      original.destroy() if original
      @trigger 'change', [@current]

    unless result.success
      @trigger 'sign-in-error', result.message

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
