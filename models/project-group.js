// Generated by CoffeeScript 1.4.0
(function() {
  var $, Api, BaseModel, Project, ProjectGroup, _base, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if ((_ref = window.zooniverse) == null) {
    window.zooniverse = {};
  }

  if ((_ref1 = (_base = window.zooniverse).models) == null) {
    _base.models = {};
  }

  BaseModel = window.zooniverse.models.BaseModel || require('./base-model');

  Api = window.zooniverse.Api || require('../lib/api');

  Project = window.zooniverse.models.Project || require('./project');

  $ = window.jQuery;

  ProjectGroup = (function(_super) {

    __extends(ProjectGroup, _super);

    function ProjectGroup() {
      return ProjectGroup.__super__.constructor.apply(this, arguments);
    }

    ProjectGroup.path = function() {
      return "projects/" + Api.current.project + "/groups";
    };

    ProjectGroup.fetch = function() {
      var fetcher, request;
      ProjectGroup.trigger('fetching');
      fetcher = new $.Deferred();
      fetcher.done(ProjectGroup.onFetch);
      if (window.DEFINE_ZOONIVERSE_PROJECT_GROUPS != null) {
        fetcher.resolve(window.DEFINE_ZOONIVERSE_PROJECT_GROUPS);
      } else {
        request = Api.current.get(ProjectGroup.path());
        request.done(function(result) {
          return fetcher.resolve(result);
        });
        request.fail(function() {
          ProjectGroup.trigger('fetch-fail');
          return fetcher.reject.apply(fetcher, arguments);
        });
      }
      return fetcher;
    };

    ProjectGroup.onFetch = function(rawGroups) {
      var newGroups, rawGroup;
      newGroups = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = rawGroups.length; _i < _len; _i++) {
          rawGroup = rawGroups[_i];
          _results.push(new this(rawGroup));
        }
        return _results;
      }).call(ProjectGroup);
      return ProjectGroup.trigger('fetch', [newGroups]);
    };

    ProjectGroup.prototype.id = '';

    ProjectGroup.prototype.group_id = '';

    ProjectGroup.prototype.project_id = '';

    ProjectGroup.prototype.zooniverse_id = '';

    ProjectGroup.prototype.name = '';

    ProjectGroup.prototype.project_name = '';

    ProjectGroup.prototype.categories = [];

    ProjectGroup.prototype.metadata = {};

    ProjectGroup.prototype.stats = {};

    ProjectGroup.prototype.state = 'active';

    ProjectGroup.prototype.type = '';

    ProjectGroup.prototype.classification_count = 0;

    ProjectGroup.prototype.created_at = '';

    ProjectGroup.prototype.updated_at = '';

    return ProjectGroup;

  }).call(this, BaseModel);

  window.zooniverse.models.ProjectGroup = ProjectGroup;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = ProjectGroup;
  }

}).call(this);
