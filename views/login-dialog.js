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
      var translate, zooniverseLogoSvg, _ref;
    
      translate = (typeof zooniverse !== "undefined" && zooniverse !== null ? zooniverse.translate : void 0) || require('../lib/translate');
    
      __out.push('\n');
    
      zooniverseLogoSvg = (typeof zooniverse !== "undefined" && zooniverse !== null ? (_ref = zooniverse.views) != null ? _ref.zooniverseLogoSvg : void 0 : void 0) || require('./zooniverse-logo-svg');
    
      __out.push('\n\n<div class="loader"></div>\n\n<button type="button" name="close-dialog">&times;</button>\n\n<header>\n  ');
    
      __out.push(zooniverseLogoSvg());
    
      __out.push('\n  ');
    
      __out.push(translate('signInHeading'));
    
      __out.push('\n</header>\n\n<label>\n  <input type="text" name="username" required="required" data-zooniverse-translate="" data-zooniverse-translate-placeholder="username" />\n</label>\n\n<label>\n  <input type="password" name="password" required="required" data-zooniverse-translate="" data-zooniverse-translate-placeholder="password" />\n</label>\n\n<div class="error-message"></div>\n\n<div class="action">\n  <a href="https://www.zooniverse.org/password/reset">');
    
      __out.push(translate('forgotPassword'));
    
      __out.push('</a>\n  <button type="submit">');
    
      __out.push(translate('signIn'));
    
      __out.push('</button>\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['loginDialog'] = template;
if (typeof module !== 'undefined') module.exports = template;
