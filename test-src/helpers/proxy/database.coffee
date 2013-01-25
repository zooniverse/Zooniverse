$ = window.jQuery

params = {}
for pair in location.search[1...].split '&'
  [key, value] = pair.split '='
  continue unless value?
  params[key] = try JSON.parse value catch e then value

randomImageUrl = ->
  hex = ('00000' + (Math.floor Math.random() * 0x1000000).toString 16)[-6...]
  "//placehold.it/1x1/#{hex}.png"

subjects = for i in [0...params.subjects || 50]
  id: "SUBJECT_#{i}"
  zooniverse_id: "SUBJECT_#{i}_ZOONIVERSE_ID"
  location: standard: randomImageUrl()
  coords: [0, 0]
  metadata: {}
  workflow_ids: ['WORKFLOW_ID']

recents = for i in [0...params.recents || 0]
  id: "RECENT_#{i}"
  subjects: [subjects[i]]
  project_id: 'PROJECT_ID'
  workflow_id: subjects[i].workflow_ids[0]
  created_at: (new Date).toUTCString()

favorites = for i in [0...params.recents || 0]
  id: "FAVORITE_#{i}"
  subjects: [subjects[i]]
  project_id: 'PROJECT_ID'
  workflow_id: subjects[i].workflow_ids[0]
  created_at: (new Date).toUTCString()

users = for name, i in ['blinky', 'pinky', 'inky', 'clyde']
  success: true
  id: "USER_#{name}"
  zooniverse_id: "#{name.toUpperCase()}_ZID"
  api_key: "#{name.toUpperCase()}_API_KEY"
  name: name
  password: name
  project:
    classification_count: recents.length
    tutorial_done: false

window.database =
  subjects: subjects
  recents: recents
  users: users

  currentUser: null

  post: (model, values) ->
    newRecord = $.extend {}, @[model][0], values
    @[model].push newRecord
    $.extend {}, newRecord

  get: (model, id) ->
    record = (item for item in @[model] when item.id is id)[0]

    if record?
      $.extend success: record?, record
    else
      success: false

  delete: (model, id) ->
    return @[model].splice i, 1 for item, i in @[model] when item.id is id
