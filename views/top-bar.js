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
      var groupIconSvg, languageIconSvg, mailIconSvg, translate, zooniverseLogoSvg, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;
    
      translate = ((_ref = window.zooniverse) != null ? _ref.translate : void 0) || require('../lib/translate');
    
      __out.push('\n');
    
      zooniverseLogoSvg = ((_ref1 = window.zooniverse) != null ? (_ref2 = _ref1.views) != null ? _ref2.zooniverseLogoSvg : void 0 : void 0) || require('./zooniverse-logo-svg');
    
      __out.push('\n');
    
      groupIconSvg = ((_ref3 = window.zooniverse) != null ? (_ref4 = _ref3.views) != null ? _ref4.groupIconSvg : void 0 : void 0) || require('./group-icon-svg');
    
      __out.push('\n');
    
      languageIconSvg = ((_ref5 = window.zooniverse) != null ? (_ref6 = _ref5.views) != null ? _ref6.languageIconSvg : void 0 : void 0) || require('./language-icon-svg');
    
      __out.push('\n');
    
      mailIconSvg = ((_ref7 = window.zooniverse) != null ? (_ref8 = _ref7.views) != null ? _ref8.mailIconSvg : void 0 : void 0) || require('./mail-icon-svg');
    
      __out.push('\n\n<div class="corner">\n  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">\n    <path d="M 0 0 L 100 0 L 100 100 Z" />\n  </svg>\n</div>\n\n<div class="no-user">\n  <div class="zooniverse-info piece">\n    ');
    
      __out.push(zooniverseLogoSvg());
    
      __out.push('\n    ');
    
      __out.push(translate('topBarHeading'));
    
      __out.push('\n  </div>\n\n  <div class="sign-in piece">\n    <button name="sign-up">');
    
      __out.push(translate('signUp'));
    
      __out.push('</button>\n    <span class="separator">|</span>\n    <button name="sign-in">');
    
      __out.push(translate('signIn'));
    
      __out.push('</button>\n  </div>\n</div>\n\n<div class="current-user">\n  <div class="user-info piece">\n    <div class="current-user-name">&mdash;</div>\n\n    <div class="sign-out">\n      <button name="sign-out">');
    
      __out.push(translate('signOut'));
    
      __out.push('</button>\n    </div>\n  </div>\n\n  <div class="groups piece">\n    <div class="groups-menu-toggle">\n      <button name="groups">');
    
      __out.push(groupIconSvg());
    
      __out.push('</button>\n    </div>\n  </div>\n\n  <div class="messages piece">\n    <a href="http://talk.');
    
      __out.push(__sanitize(location.hostname.replace(/^www\./, '')));
    
      __out.push('/#/profile" class="message-link">\n      ');
    
      __out.push(mailIconSvg());
    
      __out.push('\n      <span class="message-count">&mdash;</span>\n    </a>\n  </div>\n\n  <div class="avatar piece">\n    <a href="https://www.zooniverse.org/projects/current"><img src="" /></a>\n  </div>\n</div>\n\n<div class="languages piece">\n  <div class="languages-menu-toggle">\n    <button name="languages">');
    
      __out.push(languageIconSvg());
    
      __out.push('</button>\n  </div>\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['topBar'] = template;
if (typeof module !== 'undefined') module.exports = template;
