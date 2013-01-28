window.zooniverse ?= {}
window.zooniverse.controllers ?= {}
window.zooniverse.views ?= {}
window.zooniverse.models ?= {}

Dialog = zooniverse.controllers.Dialog || require './dialog'
SignupForm = zooniverse.controllers.SignupForm || require './signup-form'
template = zooniverse.views.signupDialog || require '../views/signup-dialog'
User = zooniverse.models.User || require '../models/user'

signupDialog = new Dialog
  content: (new SignupForm template: template).el

User.on 'change', (e, user) ->
  signupDialog.hide() if user?

window.zooniverse.controllers.signupDialog = signupDialog
module?.exports = signupDialog
