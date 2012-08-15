ProfileItem = require './profile_item'
User = require './user'

class Recent extends ProfileItem
  @configure "Recent", "project_id", "workflow_id", "subjects"
  constructor: ->
    super

  @url: ->
    "/projects/#{User.project}/users/#{User.current.id}/recents"

  @fromJSON: (results) ->
    for item in results
      Recent.create item

module.exports = Recent