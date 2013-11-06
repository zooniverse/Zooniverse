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
      var LanguageManager, code, label, _ref, _ref1, _ref2;
    
      LanguageManager = require('../lib/language-manager');
    
      __out.push('\n\n<div class="languages">\n  ');
    
      _ref1 = (_ref = LanguageManager.current) != null ? _ref.translations : void 0;
      for (code in _ref1) {
        label = _ref1[code].label;
        __out.push('\n    <div class="language">\n      <button name="language" value="');
        __out.push(__sanitize(code));
        __out.push('" ');
        if (code === ((_ref2 = LanguageManager.current) != null ? _ref2.code : void 0)) {
          __out.push('class="active"');
        }
        __out.push('>');
        __out.push(__sanitize(label));
        __out.push('</button>\n    </div>\n  ');
      }
    
      __out.push('\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['languagesMenu'] = template;
if (typeof module !== 'undefined') module.exports = template;
