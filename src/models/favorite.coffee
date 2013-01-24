window.zooniverse ?= {}
window.zooniverse.models ?= {}

Recent = zooniverse.models.Recent || require './recent'
Api = zooniverse.Api || require '../lib/api'
User = zooniverse.models.User || require './user'
$ = window.jQuery

class Favorite extends Recent
  @type: 'favorite'

  @clearOnUserChange()

  toJSON: =>
    favorite:
      subject_ids: (subject.id for subject in @subjects)

  send: ->
    @trigger 'sending'
    Api.post "/projects/#{Api.current.project}/favorites", @toJSON(), (response) =>
      @id = response.id

  delete: ->
    @trigger 'delete'
    @destroy()

window.zooniverse.models.Favorite = Favorite
module?.exports = Favorite
