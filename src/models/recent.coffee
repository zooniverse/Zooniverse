Api = require '../api'
ProfileItem = require './profile_item'
Favorite = require './favorite'
User = require './user'

class Recent extends ProfileItem
  @configure 'Recent', 'project_id', 'workflow_id', 'subjects', 'created_at', 'favorited', 'favorite_id'
  
  constructor: ->
    super
  
  @url: (params) =>
    @withParams "/projects/#{ User.project }/users/#{ User.current.id }/recents", params
  
  @fetch: -> super if User.current
  
  @fromJSON: (results) ->
    for item in results
      Recent.create item
  
  unfavorite: =>
    return unless @favorited
    
    try
      Favorite.find(@favorite_id).destroy()
    catch error
    
    fetcher = Api.delete "/projects/#{ User.project }/favorites/#{ @favorite_id }"
    @favorited = false
    @favorite_id = null
    fetcher
  
  favorite: =>
    fav = new Favorite(subjects: @subjects)
    fav.send().onSuccess (favorite) =>
      @favorited = true
      @favorite_id = favorite.id

module.exports = Recent
