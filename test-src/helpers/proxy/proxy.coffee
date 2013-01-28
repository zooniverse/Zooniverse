$ = window.jQuery
database = window.database

$.mockjax
  url: '/marco',
  response: ->
    @responseText = JSON.stringify 'polo'

$.mockjax
  url: "/projects/test/signup"
  response: (settings) ->
    username = settings.data?.username
    password = settings.data?.password
    email = settings.data?.email

    if username and password and email
      database.post 'users', id: username, name: username, password: password
      database.currentUser = database.get 'users', username
      @responseText = database.currentUser
    else
      responseText =
        success: false
        message: 'Username, password, and email are required'

$.mockjax
  url: "/projects/test/login"
  response: (settings) ->
    username = settings.data?.username
    password = settings.data?.password

    user = database.get 'users', username
    @responseText = if user.password is password
      user
    else
      success: false
      message: 'Wrong username or password'

$.mockjax
  url: "/projects/test/current_user"
  response: (settings) ->
    @responseText = database.currentUser || success: false

$.mockjax
  url: "/talk/messages"
  response: (settings) ->
    @responseText = database.get 'messages'

$.mockjax
  url: "/projects/test/logout"
  response: ->
    database.currentUser = null
    @responseText = success: true

$.mockjax
  url: '/projects/test/subjects'
  response: (settings) ->
    limit = settings.data?.limit
    limit ?= 5

    @responseText = window.database.get 'subjects', limit, splice: true

# $.mockjax
#   type: 'POST'
#   url: '/projects/test/workflows/*/classifications'
#   response: (settings) ->
#     classification = settings.data?.classification

#     @responseText = JSON.stringify
#       subject_ids: classification.subject_ids
#       success: true

$.mockjax
  url: '/projects/test/users/*/recents'
  response: (settings) ->
    page = settings.data?.page || 1
    per_page = settings.data?.per_page || 10

    start = (page * per_page) - per_page

    @responseText = JSON.stringify database.get 'recents', per_page, {page}



# Ouroboros proxy page simulated below.

$(window).on 'message', ({originalEvent: e}) ->
  recipient = e.origin

  {id, type, url, data, headers} = JSON.parse e.data

  headers ?= {}

  beforeSend = (xhr) ->
    headers['X-CSRF-Token'] = $('meta[name="csrf-token"]').attr 'content'
    xhr.setRequestHeader header, value for header, value of headers

  request = $.ajax {type, beforeSend, url, data, dataType: 'json'}

  request.done (response) ->
    parent.postMessage JSON.stringify({id, response}), recipient

  request.fail (response) ->
    parent.postMessage JSON.stringify({id, response, failure: true}), recipient

setTimeout -> parent.postMessage JSON.stringify(id: 'READY', success: true, response: +(new Date)), '*'
