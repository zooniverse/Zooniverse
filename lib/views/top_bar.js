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
      __out.push('<div id="zooniverse-top-bar-container">\n  <div id="zooniverse-top-bar-info">\n    <h3>');
    
      __out.push(I18n.t('zooniverse.top_bar.title'));
    
      __out.push('</h3>\n    <p>');
    
      __out.push(I18n.t('zooniverse.top_bar.description'));
    
      __out.push('</p>\n  </div>\n  <div id="zooniverse-top-bar-projects">\n    <h3><a href="https://www.zooniverse.org/projects">');
    
      __out.push(I18n.t('zooniverse.top_bar.projects.title'));
    
      __out.push('</a></h3>\n    <p>');
    
      __out.push(I18n.t('zooniverse.top_bar.projects.list'));
    
      __out.push('</p>\n  </div>\n  <div id="zooniverse-top-bar-languages">\n    <select class="language"></select>\n  </div>\n  <div id="zooniverse-top-bar-login">\n    <div class=\'login\'>\n      <div class="inputs">\n        <div class="textboxs">\n          <input name="username" placeholder="');
    
      __out.push(I18n.t('zooniverse.login.username').toLowerCase());
    
      __out.push('" type="text" />\n          <input name="password" placeholder="');
    
      __out.push(I18n.t('zooniverse.login.password').toLowerCase());
    
      __out.push('" type="password" />\n        </div>\n        <div class="reset">\n          <p class="password-recovery"><a href="https://www.zooniverse.org/password/reset">');
    
      __out.push(I18n.t('zooniverse.login.forgot_password'));
    
      __out.push('</a></p>\n        </div>\n      </div>\n      <div class="buttons">\n        <button name="login" type="button">');
    
      __out.push(I18n.t('zooniverse.login.login'));
    
      __out.push('</button>\n        <button name="signup" type="button">');
    
      __out.push(I18n.t('zooniverse.sign_up.button'));
    
      __out.push('</button>\n      </div>\n      <p class="errors"></p>\n      <div class="progress"><p>');
    
      __out.push(I18n.t('zooniverse.sign_in.progress'));
    
      __out.push('</p></div>\n    </div>\n    <div class=\'welcome\'>\n    </div>\n  </div>\n</div>\n<div id="zooniverse-top-bar-button">\n  <a href="#" class="top-bar-button"><img src="images/zoo-icon.png" /></a>\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}