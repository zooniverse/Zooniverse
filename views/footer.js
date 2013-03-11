window.zooniverse = window.zooniverse || {};
window.zooniverse.views = window.zooniverse.views || {};
template = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      var category, enUs, project, projects, _i, _j, _len, _len1, _ref, _ref1;
    
      enUs = (typeof zooniverse !== "undefined" && zooniverse !== null ? zooniverse.enUs : void 0) || require('../lib/en-us');
    
      __out.push('\n\n<div class="title">');
    
      __out.push(__sanitize(enUs.footer.title));
    
      __out.push('</div>\n\n');
    
      if (this.categories != null) {
        __out.push('\n  <div class="projects">\n    ');
        _ref = this.categories;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          _ref1 = _ref[_i], category = _ref1.category, projects = _ref1.projects;
          __out.push('\n      <div class="category">\n        <div class="category-title">');
          __out.push(__sanitize(category));
          __out.push('</div>\n        ');
          for (_j = 0, _len1 = projects.length; _j < _len1; _j++) {
            project = projects[_j];
            __out.push('\n          <div class="project">\n            <a href="');
            __out.push(__sanitize(project.url));
            __out.push('">');
            __out.push(__sanitize(project.name));
            __out.push('</a>\n          </div>\n        ');
          }
          __out.push('\n        <div class="project"></div>\n      </div>\n    ');
        }
        __out.push('\n  </div>\n');
      }
    
      __out.push('\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['footer'] = template;
if (typeof module !== 'undefined') module.exports = template;
