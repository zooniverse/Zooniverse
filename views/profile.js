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
    
      __out.push('<form class="sign-in-form">\n  <header>Sign in to see your profile</header>\n  <label><input type="text" name="username" placeholder="Username" required="required" /></label>\n  <label><input type="password" name="password" placeholder="Password" required="required" /></label>\n  <div class="error-message"></div>\n  <div class="action"><button type="submit">Sign in</button></div>\n  <p class="no-account">Don\'t have a Zooniverse profile? <button name="sign-up">Create one now!</button></p>\n</form>\n\n<nav>\n  <button name="turn-page" value="recents">Recents</button>\n  <button name="turn-page" value="favorites">Favorites</button>\n</nav>\n\n<div class="recents page"></div>\n<div class="recents-empty empty-message">No recents</div>\n\n<div class="favorites page"></div>\n<div class="favorites-empty empty-message">No favorites</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['profile'] = template;
if (typeof module !== 'undefined') module.exports = template;
