window.zooniverse ?= {}
window.zooniverse.controllers ?= {}
window.zooniverse.views ?= {}

BaseController = zooniverse.controllers.BaseController || require './base-controller'
enUs = zooniverse.enUs || require '../lib/en-us'
loginDialog = zooniverse.controllers.loginDialog || require './login-dialog'
signupDialog = zooniverse.controllers.signupDialog || require './signup-dialog'
template = zooniverse.views.topBar || require '../views/top-bar'
Api = zooniverse.Api || require '../lib/api'
User = zooniverse.models.User || require '../models/user'

class TopBar extends BaseController
  className: 'zooniverse-top-bar'
  template: template
  heading: enUs.topBar.heading
  messageCheckTimeout: 2 * 60 * 1000

  events:
    'click button[name="sign-in"]': 'onClickSignIn'
    'click button[name="sign-up"]': 'onClickSignUp'
    'click button[name="sign-out"]': 'onClickSignOut'

  elements:
    '.current-user-name': 'currentUserName'
    'select[name="group"]': 'groupSelect'
    '.message-count': 'messageCount'
    '.avatar img': 'avatarImage'
    '.group': 'currentGroup'

  constructor: ->
    super
    User.on 'change', @onUserChange
    @groupSelect.on 'change', @onChangeGroup

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

  processGroup: ->
    @el.toggleClass 'has-groups', User.current?.user_groups?.length > 0

    @groupSelect.empty()
    @groupSelect.append "<option value=''>(No group)</option>"

    for {id, name} in User.current?.user_groups || []
      option = "<option value='#{id}'>#{name}</option>"
      @groupSelect.append option

    @groupSelect.val User.current?.user_group_id || ''

  onChangeGroup: (e) =>
    @groupSelect.attr 'disabled', true

    setGroup = User.current.setGroup @groupSelect.val(), =>
      @groupSelect.attr 'disabled', false

window.zooniverse.controllers.TopBar = TopBar
module?.exports = TopBar
