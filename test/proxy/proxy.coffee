user = null

$.mockjax
  url: /^(\/projects\/(\w+))?\/current_user/i
  response: (settings) ->
    if user
      @responseText = { success: true }
      @responseText[key] = val for key, val of user
    else
      @responseText = { success: false }

$.mockjax
  url: /^(\/projects\/(\w+))?\/login/i
  response: (settings) ->
    user =
      id: '4fff22b8c4039a0901000002'
      api_key: '7f4793b00cc97423ca00'
      classification_count: 100
      name: 'user'
      zooniverse_id: 123456
      project:
        classification_count: 10
        tutorial_done: true
    
    @responseText = { success: true }
    @responseText[key] = val for key, val of user

$.mockjax
  url: /^(\/projects\/(\w+))?\/logout/i
  response: (settings) ->
    user = null
    @responseText = { success: true }

$.mockjax
  url: /^\/projects\/\w+\/subjects\?limit=2/i
  responseText: [
    id: "4fff2d0fc4039a09f10003e0"
    activated_at: "2012-07-27T18:17:19Z"
    coords: []
    created_at: "2012-07-12T20:01:19Z"
    location:
      standard: "http://www.seafloorexplorer.org/subjects/standard/ASP0000001.jpg"
      thumbnail: "http://www.seafloorexplorer.org/subjects/thumbnail/ASP0000001.jpg"
    metadata: {}
    project_id: "4fdf8fb3c32dab6c95000001"
    random: 0.3841740452034256
    state: "active"
    updated_at: "2012-07-27T18:16:46Z"
    workflow_ids: ["4fdf8fb3c32dab6c95000002"]
    zooniverse_id: "ASP0000001"
  ,
    id: "4fff2c76b0fdc5091c00025c"
    activated_at: "2012-07-12T20:04:38Z"
    classification_count: 3
    coords: [42.1058, -67.223337]
    created_at: "2012-07-12T19:58:46Z"
    location:
      standard: "http://www.seafloorexplorer.org/subjects/standard/ASP0000002.jpg"
      thumbnail: "http://www.seafloorexplorer.org/subjects/thumbnail/ASP0000002.jpg"
    metadata: {}
    project_id: "4fdf8fb3c32dab6c95000001"
    random: 0.6838078086002668
    state: "active"
    updated_at: "2012-07-12T19:58:46Z"
    workflow_ids: ["4fdf8fb3c32dab6c95000002"]
    zooniverse_id: "ASP0000002"
  ]
  

$(window).on 'message', ({originalEvent: e}) ->
  recipient = e.origin
  
  {id, type, url, data, headers} = JSON.parse e.data
  
  headers or= { }
  dataType = 'json'
  
  beforeSend = (xhr) =>
    headers['X-CSRF-Token'] = $('meta[name="csrf-token"]').attr 'content'
    xhr.setRequestHeader header, value for header, value of headers
  
  request = $.ajax {type, beforeSend, url, data, dataType}
  
  request.done (response) ->
    parent.postMessage JSON.stringify({id, response}), recipient
  
  request.fail (response) ->
    parent.postMessage JSON.stringify({id, response, failure: true}), recipient
