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
      var translate, _ref;
    
      translate = ((_ref = window.zooniverse) != null ? _ref.translate : void 0) || require('../lib/translate');
    
      __out.push('\n\n<form class="sign-in-form">\n  <div class="loader"></div>\n\n  <header>');
    
      __out.push(translate('signInForProfile'));
    
      __out.push('</header>\n  <label><input type="text" name="username" required="required" data-zooniverse-translate="" data-zooniverse-translate-placeholder="username" /></label>\n  <label><input type="password" name="password" required="required" data-zooniverse-translate="" data-zooniverse-translate-placeholder="password" /></label>\n  <div class="error-message"></div>\n  <div class="action"><button type="submit">');
    
      __out.push(translate('signIn'));
    
      __out.push('</button></div>\n  <p class="no-account">');
    
      __out.push(translate('noAccount'));
    
      __out.push(' <button name="sign-up">');
    
      __out.push(translate('signUp'));
    
      __out.push('</button></p>\n</form>\n\n<nav>\n  <button name="turn-page" value="recents">');
    
      __out.push(translate('recents'));
    
      __out.push('</button>\n  <button name="turn-page" value="favorites">');
    
      __out.push(translate('favorites'));
    
      __out.push('</button>\n</nav>\n\n<div class="recents page"></div>\n<div class="recents-empty empty-message">');
    
      __out.push(translate('recents'));
    
      __out.push(' (');
    
      __out.push(translate('none'));
    
      __out.push(')</div>\n\n<div class="favorites page"></div>\n<div class="favorites-empty empty-message">');
    
      __out.push(translate('favorites'));
    
      __out.push(' (');
    
      __out.push(translate('none'));
    
      __out.push(')</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['profile'] = template;
if (typeof module !== 'undefined') module.exports = template;
