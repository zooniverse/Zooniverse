window.zooniverse ?= {}
window.zooniverse.controllers ?= {}
window.zooniverse.views ?= {}

BaseController = zooniverse.controllers.BaseController || require './base-controller'
LoginForm = zooniverse.controllers.LoginForm || require './login-form'
template = zooniverse.views.topBar || require '../views/top-bar'
Api = zooniverse.api || require '../lib/api'
User = zooniverse.models.User || require '../models/user'

class TopBar extends BaseController
  className: 'zooniverse-top-bar'
  template: template
  messageTimeout: 2 * 60 * 1000

  events:
    'click button[name="sign-up"]': 'onClickSignUp'
    'click button[name="sign-out"]': 'onClickSignOut'

  elements:
    '.current-user-name': 'currentUserName'
    '.message-count': 'messageCount'
    '.avatar img': 'avatarImage'

  constructor: ->
    super

    new LoginForm
      el: @el.find 'form[name="sign-in"]'

    User.on 'change', @onUserChange

  onClickSignUp: ->
    alert 'TODO: Sign up dialog'

  onClickSignOut: ->
    User.logout()

  onUserChange: (e, user) =>
    @el.toggleClass 'signed-in', user?
    @currentUserName.html user?.name || ''
    @avatarImage.attr src: user?.avatar
    @getMessages()

  getMessages: =>
    if User.current?
      Api.current.get '/talk/messages', (messages) =>
        @el.toggleClass 'has-messages', messages.length isnt 0
        @messageCount.html messages.length
        setTimeout @getMessages, @messageTimeout

    else
      @el.removeClass 'has-messages'
      @messageCount.html '0'

window.zooniverse.controllers.TopBar = TopBar
module?.exports = TopBar
