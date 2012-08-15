ProfileItem = require './profile_item'
User = require './user'

class Favorite extends ProfileItem
  @configure "Favorite", "project_id", "workflow_id", "subjects", "created_at"
  constructor: ->
    super

  @url: ->
    "/projects/#{User.project}/users/#{User.current.id}/favorites"

  @fromJSON: (results) ->
    for item in results
      Favorite.create item

module.exports = Favorite
