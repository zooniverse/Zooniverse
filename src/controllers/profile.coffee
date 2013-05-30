window.zooniverse ?= {}
window.zooniverse.controllers ?= {}
window.zooniverse.views ?= {}

BaseController = zooniverse.controllers.BaseController || require './base-controller'
template = zooniverse.views.profile || require '../views/profile'
LoginForm = zooniverse.controllers.LoginForm || require 'zooniverse/controllers/login-form'
Paginator = zooniverse.controllers.Paginator || require './paginator'
Recent = zooniverse.models.Recent || require '../models/recent'
Favorite = zooniverse.models.Favorite || require '../models/favorite'
itemTemplate = zooniverse.views.profileItem || require '../views/profile-item'
User = zooniverse.models.User || require '../models/user'
$ = window.jQuery

class Profile extends BaseController
  className: 'zooniverse-profile'
  template: template
  recentTemplate: itemTemplate
  favoriteTemplate: itemTemplate

  loginForm: null
  recentsList: null
  favoritesList: null

  events:
    'click button[name="unfavorite"]': 'onClickUnfavorite'
    'click button[name="turn-page"]': 'onTurnPage'

  elements:
    'nav': 'navigation'
    'button[name="turn-page"]': 'pageTurners'

  constructor: ->
    super

    @loginForm = new LoginForm
      el: @el.find '.sign-in-form'

    @recentsList = new Paginator
      type: Recent
      perPage: 12
      className: "#{Paginator::className} recents"
      el: @el.find '.recents'
      itemTemplate: @recentTemplate

    @favoritesList = new Paginator
      type: Favorite
      perPage: 12
      className: "#{Paginator::className} favorites"
      el: @el.find '.favorites'
      itemTemplate: @favoriteTemplate

    User.on 'change', => @onUserChange arguments...

  onUserChange: (e, user) ->
    @el.toggleClass 'signed-in', user?
    @pageTurners.first().click()

  onClickUnfavorite: (e) ->
    target = $(e.currentTarget)
    id = target.val()
    favorite = Favorite.find id
    favorite.delete()
    target.parents('[data-item-id]').first().remove()

  onTurnPage: (e) ->
    @pageTurners.removeClass 'active'
    target = $(e.target)
    target.addClass 'active'
    targetType = target.val()
    @recentsList.el.add(@favoritesList.el).removeClass 'active'
    @["#{targetType}List"].el.addClass 'active'

window.zooniverse.controllers.Profile = Profile
module?.exports = Profile
