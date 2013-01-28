window.zooniverse ?= {}
window.zooniverse.controllers ?= {}
window.zooniverse.views ?= {}

BaseController = zooniverse.controllers.BaseController || require './base-controller'
loginDialog = zooniverse.controllers.loginDialog || require './login-dialog'
signupDialog = zooniverse.controllers.signupDialog || require './signup-dialog'
template = zooniverse.views.topBar || require '../views/top-bar'
Api = zooniverse.api || require '../lib/api'
User = zooniverse.models.User || require '../models/user'

class TopBar extends BaseController
  className: 'zooniverse-top-bar'
  template: template
  messageCheckTimeout: 2 * 60 * 1000

  events:
    'click button[name="sign-in"]': 'onClickSignIn'
    'click button[name="sign-up"]': 'onClickSignUp'
    'click button[name="sign-out"]': 'onClickSignOut'

  elements:
    '.current-user-name': 'currentUserName'
    '.message-count': 'messageCount'
    '.avatar img': 'avatarImage'

  constructor: ->
    super

    User.on 'change', @onUserChange

  onClickSignIn: ->
    loginDialog.show()

  onClickSignUp: ->
    signupDialog.show()

  onClickSignOut: ->
    User.logout()

  onUserChange: (e, user) =>
    @el.toggleClass 'signed-in', user?
    @getMessages()
    @currentUserName.html user?.name || ''
    @avatarImage.attr src: user?.avatar

  getMessages: =>
    if User.current?
      Api.current.get '/talk/messages', (messages) =>
        @el.toggleClass 'has-messages', messages.length isnt 0
        @messageCount.html messages.length
        setTimeout @getMessages, @messageCheckTimeout

    else
      @el.removeClass 'has-messages'
      @messageCount.html '0'

window.zooniverse.controllers.TopBar = TopBar
module?.exports = TopBar
