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
      var category, project, projects, translate, zooniverseLogoSvg, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
    
      translate = (typeof zooniverse !== "undefined" && zooniverse !== null ? zooniverse.translate : void 0) || require('../lib/translate');
    
      __out.push('\n');
    
      zooniverseLogoSvg = ((_ref = window.zooniverse) != null ? (_ref1 = _ref.views) != null ? _ref1.zooniverseLogoSvg : void 0 : void 0) || require('./zooniverse-logo-svg');
    
      __out.push('\n\n<a href="https://www.zooniverse.org/" class="zooniverse-logo-container">\n  ');
    
      __out.push(zooniverseLogoSvg());
    
      __out.push('\n</a>\n\n<div class="zooniverse-footer-content">\n  <div class="zooniverse-footer-heading">');
    
      __out.push(translate('footerHeading'));
    
      __out.push('</div>\n\n  ');
    
      if (this.categories != null) {
        __out.push('\n    <div class="zooniverse-footer-projects">\n      ');
        _ref2 = this.categories;
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          _ref3 = _ref2[_i], category = _ref3.category, projects = _ref3.projects;
          __out.push('\n        <div class="zooniverse-footer-category">\n          <div class="zooniverse-footer-category-title">');
          __out.push(__sanitize(category));
          __out.push('</div>\n          ');
          for (_j = 0, _len1 = projects.length; _j < _len1; _j++) {
            project = projects[_j];
            __out.push('\n            <div class="zooniverse-footer-project">\n              <a href="');
            __out.push(__sanitize(project.url));
            __out.push('">');
            __out.push(__sanitize(project.name));
            __out.push('</a>\n            </div>\n          ');
          }
          __out.push('\n          <div class="zooniverse-footer-project"></div>\n        </div>\n      ');
        }
        __out.push('\n    </div>\n  ');
      }
    
      __out.push('\n\n  <div class="zooniverse-footer-general">\n    <!--div class="zooniverse-footer-category"><a href="#">Zooniverse Daily</a></div-->\n    <div class="zooniverse-footer-category">\n      <a href="https://www.zooniverse.org/privacy">');
    
      __out.push(translate('privacyPolicy'));
    
      __out.push('</a>\n    </div>\n\n    <div class="zooniverse-footer-category">\n      <a href="https://github.com/zooniverse">');
    
      __out.push(translate('forkOnGitHub'));
    
      __out.push('</a>\n    </div>\n  </div>\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['footer'] = template;
if (typeof module !== 'undefined') module.exports = template;
