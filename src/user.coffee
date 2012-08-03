Api = require './api'
ProxyFrame = require './proxy_frame'

User =
  current: null
  
  fetch: (callback) ->
    Api.getJSON '/current_user', (result) =>
      @current = if result.success
        delete result.success
        result
      else
        null
      
      @setAuthHeaders()
      callback? @current
  
  setAuthHeaders: ->
    if @current
      auth = base64.encode "#{ @current.name }:#{ @current.apiKey }"
      ProxyFrame.headers['Authorization'] = "Basic #{ auth }"
    else
      delete ProxyFrame.headers['Authorization']

module.exports = User
