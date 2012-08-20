Api = require '../api'
ProfileItem = require './profile_item'
User = require './user'

class Favorite extends ProfileItem
  @configure "Favorite", "project_id", "workflow_id", "subjects", "created_at"
  constructor: ->
    super
  
  @url: ->
    "/projects/#{ User.project }/users/#{ User.current.id }/favorites"
  
  @fetch: -> super if User.current
  
  @fromJSON: (results) ->
    for item in results
      Favorite.create item
  
  destroy: =>
    super
    Api.delete "/projects/#{ User.project }/favorites/#{ @id }"

module.exports = Favorite