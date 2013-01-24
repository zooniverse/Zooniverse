$ = window.jQuery

USERS = {}
for name, i in ['blinky', 'pinky', 'inky', 'clyde']
  USERS[name] =
    success: true
    id: name.toUpperCase()
    zooniverse_id: "#{name.toUpperCase()}_ZID"
    api_key: "#{name.toUpperCase()}_API_KEY"
    name: name
    password: name
    project:
      tutorial_done: false

SUBJECTS = for i in [0...50]
  id: "SUBJECT_#{i}"
  zooniverse_id: "SUBJECT_#{i}_ZID"
  coords: [0, 0]
  location: standard: '//placehold.it/1x1.png'
  metadata: {}
  workflow_ids: ['WORKFLOW_ID']

RECENTS = for subject, i in SUBJECTS
  id: "RECENT_#{i}"
  project_id: 'PROJECT_ID'
  workflow_id: subject.workflow_ids[0]
  subjects: [subject]
  created_at: (new Date).toUTCString()



$.mockjax
  url: '/marco',
  response: ->
    @responseText = JSON.stringify 'polo'

$.mockjax
  url: "/projects/test/current_user"
  response: (settings) ->
    @responseText = JSON.stringify if settings.data?.testSignedIn is true
      USERS.clyde
    else
      success: false

$.mockjax
  url: "/projects/test/login"
  response: (settings) ->
    username = settings.data?.username
    password = settings.data?.password

    @responseText = JSON.stringify if username of USERS and password is USERS[username].password
      USERS[username]
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
  response: (settings) ->
    username = settings.data?.username
    password = settings.data?.password
    email = settings.data?.email

    @responseText = JSON.stringify if username and password and email
      USERS.clyde
    else
      success: false
      message: 'Username, password, and email are required'

$.mockjax
  url: '/projects/test/subjects'
  response: (settings) ->
    limit = settings.data?.limit
    limit ?= 5

    @responseText = JSON.stringify SUBJECTS.splice 0, limit

$.mockjax
  type: 'POST'
  url: '/projects/test/workflows/*/classifications'
  response: (settings) ->
    classification = settings.data?.classification

    @responseText = JSON.stringify
      subject_ids: classification.subject_ids
      success: true

$.mockjax
  url: '/projects/test/users/*/recents'
  response: (settings) ->
    page = settings.data?.page || 1
    per_page = settings.data?.per_page || 10

    start = (page * per_page) - per_page

    @responseText = JSON.stringify RECENTS[start...start + per_page]



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
