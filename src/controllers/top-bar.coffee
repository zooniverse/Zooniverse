window.zooniverse ?= {}
window.zooniverse.controllers ?= {}
window.zooniverse.views ?= {}

BaseController = zooniverse.controllers.BaseController || require './base-controller'
loginDialog = zooniverse.controllers.loginDialog || require './login-dialog'
signupDialog = zooniverse.controllers.signupDialog || require './signup-dialog'
template = zooniverse.views.topBar || require '../views/top-bar'
Api = zooniverse.Api || require '../lib/api'
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
    '.group': 'currentGroup'

  constructor: (@title = 'A Zooniverse project') ->
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
    @processGroup()
    @currentUserName.html user?.name || ''
    @avatarImage.attr src: user?.avatar

  getMessages: =>
    if User.current?
      Api.current.get '/talk/messages/count', (messages) =>
        @el.toggleClass 'has-messages', messages isnt 0
        @messageCount.html messages
        setTimeout @getMessages, @messageCheckTimeout

    else
      @el.removeClass 'has-messages'
      @messageCount.html '0'

  processGroup: =>
    if User.current? and User.current.hasOwnProperty 'user_group_id'
      @el.addClass 'has-group'

      for group in User.current.user_groups
        currentGroup = group
        continue if group.id is not User.current.user_group_id

    else
      @el.removeClass 'has-group'

window.zooniverse.controllers.TopBar = TopBar
module?.exports = TopBar
