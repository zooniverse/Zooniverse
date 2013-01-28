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
      var enUs;
    
      enUs = (typeof zooniverse !== "undefined" && zooniverse !== null ? zooniverse.enUs : void 0) || require('../lib/en-us');
    
      __out.push('\n<button type="button" name="close-dialog">&times;</button>\n\n<header>(*) Sign up for a new account</header>\n\n<label>\n  <input type="text" name="username" required="required" placeholder="');
    
      __out.push(__sanitize(enUs.topBar.username));
    
      __out.push('" />\n</label>\n\n<label>\n  <input type="password" name="password" required="required" placeholder="');
    
      __out.push(__sanitize(enUs.topBar.password));
    
      __out.push('" />\n</label>\n\n<label>\n  <input type="email" name="email" required="required" placeholder="');
    
      __out.push(__sanitize(enUs.topBar.email));
    
      __out.push('" />\n</label>\n\n<label>\n  <input type="text" name="real-name" placeholder="');
    
      __out.push(__sanitize(enUs.topBar.realName));
    
      __out.push('" />\n  <div class="explanation">');
    
      __out.push(enUs.topBar.whyRealName);
    
      __out.push('</div>\n</label>\n\n<div class="error-message"></div>\n\n<div class="action">\n  <a href="http://zooniverse.org/">');
    
      __out.push(__sanitize(enUs.topBar.forgotPassword));
    
      __out.push('</a>\n  <button type="submit">');
    
      __out.push(__sanitize(enUs.topBar.signUp));
    
      __out.push('</button>\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['signupDialog'] = template;
if (typeof module !== 'undefined') module.exports = template;
