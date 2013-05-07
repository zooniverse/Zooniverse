// Generated by CoffeeScript 1.4.0
(function() {
  var Dialog, SignupForm, User, signupDialog, template, _base, _base1, _base2, _ref, _ref1, _ref2, _ref3;

  if ((_ref = window.zooniverse) == null) {
    window.zooniverse = {};
  }

  if ((_ref1 = (_base = window.zooniverse).controllers) == null) {
    _base.controllers = {};
  }

  if ((_ref2 = (_base1 = window.zooniverse).views) == null) {
    _base1.views = {};
  }

  if ((_ref3 = (_base2 = window.zooniverse).models) == null) {
    _base2.models = {};
  }

  Dialog = zooniverse.controllers.Dialog || require('./dialog');

  SignupForm = zooniverse.controllers.SignupForm || require('./signup-form');

  template = zooniverse.views.signupDialog || require('../views/signup-dialog');

  User = zooniverse.models.User || require('../models/user');

  signupDialog = new Dialog({
    content: (new SignupForm({
      template: template
    })).el
  });

  User.on('change', function(e, user) {
    if (user != null) {
      return signupDialog.hide();
    }
  });

  window.zooniverse.controllers.signupDialog = signupDialog;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = signupDialog;
  }

}).call(this);