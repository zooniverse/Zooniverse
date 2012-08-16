ProfileItem = require './profile_item'
User = require './user'

class Recent extends ProfileItem
  @configure "Recent", "project_id", "workflow_id", "subjects", "created_at"
  constructor: ->
    super

  @url: ->
    "/projects/#{ User.project }/users/#{ User.current.id }/recents"
  
  @fetch: -> super if User.current
  
  @fromJSON: (results) ->
    for item in results
      Recent.create item

module.exports = Recent
