ProfileItem = require './profile_item'
User = require './user'

class Favorite extends ProfileItem
  @configure "Favorite", "project_id", "workflow_id", "subjects"
  constructor: ->
    super

  @url: ->
    "/projects/#{User.project}/users/#{User.current.id}/recents"

  @fromJSON: (results) ->
    for item in results
      item = Favorite.create item

module.exports = Favorite
