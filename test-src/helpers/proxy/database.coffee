$ = window.jQuery

params = {}
for pair in location.search[1...].split '&'
  [key, value] = pair.split '='
  continue unless value?
  params[key] = try JSON.parse value catch e then value

randomImageUrl = (size = '1x1') ->
  hex = ('00000' + (Math.floor Math.random() * 0x1000000).toString 16)[-6...]
  "//placehold.it/#{size}/#{hex}.png"

subjects = for i in [0...params.subjects || 50]
  id: "SUBJECT_#{i}"
  zooniverse_id: "SUBJECT_#{i}_ZOONIVERSE_ID"
  location: standard: randomImageUrl()
  coords: [0, 0]
  metadata: {}
  workflow_ids: ['WORKFLOW_ID']

recents = for i in [0...params.recents || subjects.length]
  id: "RECENT_#{i}"
  subjects: [subjects[i]]
  project_id: 'PROJECT_ID'
  workflow_id: subjects[i].workflow_ids[0]
  created_at: (new Date).toUTCString()

favorites = for i in [0...params.recents || 5]
  id: "FAVORITE_#{i}"
  subjects: [subjects[i]]
  project_id: 'PROJECT_ID'
  workflow_id: subjects[i].workflow_ids[0]
  created_at: (new Date).toUTCString()

users = for name, i in ['blinky', 'pinky', 'inky', 'clyde']
  success: true
  id: name
  zooniverse_id: "#{name.toUpperCase()}_ZID"
  api_key: "#{name.toUpperCase()}_API_KEY"
  name: name
  password: name
  avatar: randomImageUrl '64x64'
  project:
    classification_count: recents.length
    tutorial_done: false

messages = for i in [0...params.messages || 5]
  {}

window.database =
  subjects: subjects
  recents: recents
  users: users
  messages: messages

  currentUser: null

  post: (model, values) ->
    newRecord = $.extend {}, @[model][0], values
    @[model].push newRecord
    $.extend {}, newRecord

  get: (model, query = 10, {splice, page} = {}) ->
    page ?= 1

    if typeof query is 'string'
      query = id: query
      byId = true

    if typeof query is 'number'
      if splice
        @[model][(page - 1) * query...].splice 0, query
      else
        @[model][(page - 1) * query...].slice 0, query

    else
      matches = for record in @[model]
        miss = false
        for param, value of query
          unless record[param] is value
            miss = true
            break
        continue if miss
        record

      if matches.length is 0
        success: false
      else
        if byId
          $.extend success: record?, record
        else
          matches

  delete: (model, id) ->
    return @[model].splice i, 1 for item, i in @[model] when item.id is id

window.database.currentUser = window.database.get 'users', 'clyde'
