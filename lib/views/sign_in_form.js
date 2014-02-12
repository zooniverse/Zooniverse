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
      __out.push('<p class="title">');
    
      __out.push(I18n.t('zooniverse.sign_in.title'));
    
      __out.push('</p>\n<p class="errors"></p>\n<form>\n  <label><span>');
    
      __out.push(I18n.t('zooniverse.login.username'));
    
      __out.push('</span> <input type="text" name="username" required="required" /></label>\n  <label><span>');
    
      __out.push(I18n.t('zooniverse.login.password'));
    
      __out.push('</span> <input type="password" name="password" required="required" /></label>\n  <button type="submit">');
    
      __out.push(I18n.t('zooniverse.sign_in.button'));
    
      __out.push('</button>\n</form>\n<p class="progress">');
    
      __out.push(I18n.t('zooniverse.sign_in.progress'));
    
      __out.push('</p>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}