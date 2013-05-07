// Generated by CoffeeScript 1.4.0
(function() {
  var $, BaseController, Paginator, User, template, _base, _base1, _ref, _ref1, _ref2,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if ((_ref = window.zooniverse) == null) {
    window.zooniverse = {};
  }

  if ((_ref1 = (_base = window.zooniverse).controllers) == null) {
    _base.controllers = {};
  }

  if ((_ref2 = (_base1 = window.zooniverse).views) == null) {
    _base1.views = {};
  }

  BaseController = window.zooniverse.controllers.BaseController || require('./base-controller');

  template = window.zooniverse.views.paginator || require('../views/paginator');

  User = window.zooniverse.models.User || require('../models/user');

  $ = window.jQuery;

  Paginator = (function(_super) {

    __extends(Paginator, _super);

    Paginator.prototype.type = null;

    Paginator.prototype.itemTemplate = null;

    Paginator.prototype.className = 'zooniverse-paginator';

    Paginator.prototype.template = template;

    Paginator.prototype.pages = 0;

    Paginator.prototype.perPage = 10;

    Paginator.prototype.events = {
      'click button[name="page"]': 'onClickPage'
    };

    Paginator.prototype.elements = {
      '.items': 'itemsContainer',
      '.numbered': 'numbersContainer'
    };

    function Paginator() {
      this.onItemDestroyed = __bind(this.onItemDestroyed, this);

      this.onItemFromClassification = __bind(this.onItemFromClassification, this);

      this.onFetchFail = __bind(this.onFetchFail, this);

      this.onFetch = __bind(this.onFetch, this);

      this.onUserChange = __bind(this.onUserChange, this);
      Paginator.__super__.constructor.apply(this, arguments);
      User.on('change', this.onUserChange);
      this.type.on('from-classification', this.onItemFromClassification);
      this.type.on('destroy', this.onItemDestroyed);
    }

    Paginator.prototype.onUserChange = function(e, user) {
      var _ref3;
      this.reset((user != null ? (_ref3 = user.project) != null ? _ref3.classification_count : void 0 : void 0) || 0);
      this.onFetch([]);
      if (user != null) {
        return this.goTo(1);
      }
    };

    Paginator.prototype.reset = function(itemCount) {
      var button, i, _i, _ref3, _results;
      this.pages = Math.ceil(itemCount / this.perPage);
      this.numbersContainer.empty();
      _results = [];
      for (i = _i = 0, _ref3 = this.pages; 0 <= _ref3 ? _i < _ref3 : _i > _ref3; i = 0 <= _ref3 ? ++_i : --_i) {
        button = $("<button name='page' value='" + (i + 1) + "'>" + (i + 1) + "</button>");
        _results.push(this.numbersContainer.append(button));
      }
      return _results;
    };

    Paginator.prototype.onClickPage = function(_arg) {
      var page, target;
      target = _arg.target;
      page = +$(target).val();
      return this.goTo(page);
    };

    Paginator.prototype.goTo = function(page) {
      var fetch,
        _this = this;
      page = Math.max(page, 1);
      this.el.removeClass('failed');
      this.numbersContainer.children().removeClass('active');
      this.numbersContainer.children("[value='" + page + "']").addClass('active');
      this.el.addClass('loading');
      fetch = this.type.fetch({
        page: page,
        per_page: this.perPage
      });
      fetch.then(this.onFetch, this.onFetchFail);
      return fetch.always(function() {
        return _this.el.removeClass('loading');
      });
    };

    Paginator.prototype.onFetch = function(items) {
      var item, itemEl, _i, _len, _results;
      this.itemsContainer.empty();
      this.el.toggleClass('empty', items.length === 0);
      _results = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        itemEl = this.getItemEl(item);
        _results.push(itemEl.prependTo(this.itemsContainer));
      }
      return _results;
    };

    Paginator.prototype.getItemEl = function(item) {
      var inner, itemEl, _ref3, _ref4;
      itemEl = this.itemsContainer.find("[data-item-id='" + item.id + "']");
      if (itemEl.length === 0) {
        inner = this.itemTemplate != null ? this.itemTemplate(item) : "<div class='item'><a href=\"" + (((_ref3 = item.subjects[0]) != null ? _ref3.talkHref() : void 0) || '#/SUBJECT-ERROR') + "\">" + (((_ref4 = item.subjects[0]) != null ? _ref4.zooniverse_id : void 0) || 'Error in subject') + "</a></div>";
        itemEl = $(inner);
        itemEl.attr({
          'data-item-id': item.id
        });
      }
      return itemEl;
    };

    Paginator.prototype.onFetchFail = function() {
      return this.el.addClass('failed');
    };

    Paginator.prototype.onItemFromClassification = function(e, item) {
      var itemEl, _results;
      itemEl = this.getItemEl(item);
      itemEl.addClass('new');
      itemEl.prependTo(this.itemsContainer);
      if (this.itemsContainer.children().length > this.perPage) {
        _results = [];
        while (this.itemsContainer.children().length !== this.perPage) {
          _results.push(this.itemsContainer.children().last().remove());
        }
        return _results;
      }
    };

    Paginator.prototype.onItemDestroyed = function(e, item) {
      return this.getItemEl(item).remove();
    };

    return Paginator;

  })(BaseController);

  window.zooniverse.controllers.Paginator = Paginator;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Paginator;
  }

}).call(this);