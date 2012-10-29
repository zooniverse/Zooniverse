module.exports = function(__obj) {
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
    
      __out.push('<p class="title">Sign up for a new Zooniverse account</p>\n<p class="errors"></p>\n<form>\n  <label><span>Username</span> <input type="text" name="username" required="required" /></label>\n  <label><span>Email address</span> <input type="text" name="email" required="required" /></label>\n  <label><span>Password</span> <input type="password" name="password" required="required" /></label>\n  <label><span>Password (confirm)</span> <input type="password" name="password-confirm" required="required" /></label>\n  <label class="privacy-policy"><input type="checkbox" name="policy" required="required" /> I agree to the <a href="https://www.zooniverse.org/privacy" target="_blank">privacy policy</a></label>\n  <button type="submit">Sign up</button>\n</form>\n<p class="progress">Creating account and signing in...</p>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}