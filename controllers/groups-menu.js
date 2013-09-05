// Generated by CoffeeScript 1.4.0
(function() {
  var $, Controller, Dropdown, GroupsMenu, User, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('./base-controller');

  User = require('../models/user');

  template = require('../views/groups-menu');

  $ = window.jQuery;

  Dropdown = require('./dropdown');

  GroupsMenu = (function(_super) {

    __extends(GroupsMenu, _super);

    GroupsMenu.prototype.className = 'zooniverse-groups-menu';

    GroupsMenu.prototype.events = {
      'click button[name="user-group"]': 'onClickGroupButton'
    };

    function GroupsMenu() {
      this.onUserChangeGroup = __bind(this.onUserChangeGroup, this);

      this.onUserChange = __bind(this.onUserChange, this);
      GroupsMenu.__super__.constructor.apply(this, arguments);
      User.on('change', this.onUserChange);
      User.on('change-group', this.onUserChangeGroup);
    }

    GroupsMenu.prototype.onUserChange = function(e, user) {
      if (user != null) {
        this.el.html(template(user));
        if (user.user_group_id) {
          return this.el.find("button[name='" + user.user_group_id + "']").click();
        }
      }
    };

    GroupsMenu.prototype.onUserChangeGroup = function(e, user, group) {
      var buttons;
      buttons = this.el.find('button[name="user-group"]');
      buttons.removeClass('active');
      if (group != null) {
        return buttons.filter("[value='" + group.id + "']").addClass('active');
      }
    };

    GroupsMenu.prototype.onClickGroupButton = function(e) {
      var target, _ref;
      target = $(e.currentTarget);
      if ((_ref = User.current) != null) {
        _ref.setGroup(target.val() || 'TODO_HOW_DO_I_STOP_CLASSIFYING_AS_PART_OF_A_GROUP');
      }
      return Dropdown.closeAll();
    };

    return GroupsMenu;

  })(Controller);

  module.exports = GroupsMenu;

}).call(this);
