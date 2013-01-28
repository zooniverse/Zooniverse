window.zooniverse ?= {}
window.zooniverse.controllers ?= {}

Dialog = zooniverse.controllers.Dialog || require './dialog'
LoginForm = zooniverse.controllers.LoginForm || require './login-form'
template = zooniverse.views.loginDialog || require '../views/login-dialog'
User = zooniverse.models.User || require '../models/user'

loginDialog = new Dialog
  content: (new LoginForm template: template).el

User.on 'change', (e, user) ->
  loginDialog.hide() if user?

window.zooniverse.controllers.loginDialog = loginDialog
module?.exports = loginDialog
