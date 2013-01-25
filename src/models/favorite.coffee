window.zooniverse ?= {}
window.zooniverse.models ?= {}

Recent = window.zooniverse.models.Recent || require './recent'
Api = window.zooniverse.Api || require '../lib/api'
User = window.zooniverse.models.User || require './user'
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
    # TODO: Api.current.delete ...
    @destroy()

window.zooniverse.models.Favorite = Favorite
module?.exports = Favorite
