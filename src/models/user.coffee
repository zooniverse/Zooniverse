window.zooniverse ?= {}
window.zooniverse.models ?= {}

EventEmitter = window.zooniverse.EventEmitter || require '../lib/event-emitter'
Api = window.zooniverse.Api || require '../lib/api'
base64 = window.base64 || (require '../vendor/base64'; window.base64)

class User extends EventEmitter
  @current: false

  @path: ->
    if Api.current.project then "/projects/#{ Api.current.project }" else ''

  @fetch: =>
    @trigger 'fetching', arguments
    fetcher = Api.current.getJSON "#{ @path() }/current_user", arguments...
    fetcher.always @onFetch
    fetcher

  @login: ({username, password}) ->
    @trigger 'logging-in', arguments
    login = Api.current.getJSON "#{ @path() }/login", arguments...
    login.done @onFetch
    login.fail @onFail

    login

  @logout: ->
    @trigger 'logging-out', arguments
    logout = Api.current.getJSON "#{ @path() }/logout", arguments...
    logout.always @onFetch
    logout

  @signup: ({username, password, email}) ->
    @trigger 'signing-up'
    signup = Api.current.getJSON "#{ @path() }/signup", arguments...
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
    @[property] = value for own property, value of params

  setGroup: (groupId, callback) ->
    return unless User.current?

    path = if groupId?
      "/user_groups/#{groupId}/participate"
    else
      "/user_groups/TODO_HOW_DO_I_LEAVE_A_GROUP/participate"

    get = Api.current?.getJSON path, (group) =>
      @trigger 'change-group', group
      callback? arguments...

    get

  setPreference: (key, value, global = false, callback) ->
    return unless User.current?
    [global, callback] = [false, global] if typeof global is 'function'

    User.current.preferences ?= {}
    if global
      User.current.preferences[key] = value
    else
      User.current.preferences[Api.current.project] ?= {}
      User.current.preferences[Api.current.project][key] = value

    key = "#{Api.current.project}.#{key}" unless global
    Api.current.put "/users/preferences", {key, value}, callback

  deletePreference: (key, global = false, callback) ->
    return unless User.current?
    [global, callback] = [false, global] if typeof global is 'function'

    User.current.preferences ?= {}
    if global
      delete User.current.preferences[key]
    else
      User.current.preferences[Api.current.project] ?= {}
      delete User.current.preferences[Api.current.project][key]

    key = "#{Api.current.project}.#{key}" unless global
    Api.current.delete "/users/preferences", {key}, callback

window.zooniverse.models.User = User
module?.exports = User
