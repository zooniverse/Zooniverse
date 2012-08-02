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
