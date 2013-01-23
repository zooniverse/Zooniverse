sinon = window.sinon
$ = window.jQuery

$.mockjax
  url: '/marco',
  response: ->
    @responseText = JSON.stringify 'polo'

VALID_USER_RESPONSE =
  success: true
  id: 'ID'
  zooniverse_id: 'ZOONIVERSE_ID'
  api_key: 'API_KEY'
  name: 'tester'
  project:
    tutorial_done: false

$.mockjax
  url: "/projects/test/current_user"
  response: ({data: {testSignedIn}}) ->
    @responseText = JSON.stringify if testSignedIn is true
      VALID_USER_RESPONSE
    else
      success: false

$.mockjax
  url: "/projects/test/login"
  response: ({data: {username, password}}) ->
    @responseText = JSON.stringify if username is 'GOOD' and password is 'GOOD'
      VALID_USER_RESPONSE
    else
      success: false
      message: 'Invalid username or password'

$.mockjax
  url: "/projects/test/logout"
  response: ->
    @responseText = JSON.stringify
      success: true

$.mockjax
  url: "/projects/test/signup"
  response: ({data: {username, password, email}}) ->
    @responseText = JSON.stringify if username and password and email
      VALID_USER_RESPONSE
    else
      success: false
      message: 'Username, password, and email are required'

$.mockjax
  url: '/projects/test/subjects'
  response: ({data: {limit}}) ->
    limit ?= 5

    subjects = for i in [0...limit]
      id: "#{i}_#{Math.random()}".split('.')[1]
      zooniverse_id: "#{Math.random()}".split('.')[1]
      coords: [0, 0]
      location: standard: '//placehold.it/1x1.png'
      metadata: {}

    @responseText = JSON.stringify subjects


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

setTimeout -> parent.postMessage JSON.stringify(id: 'READY', response: +(new Date)), '*'
