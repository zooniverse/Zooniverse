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
      var Favorite, location, thumbSrc, _ref, _ref1, _ref2, _ref3;
    
      Favorite = ((_ref = window.zooniverse) != null ? (_ref1 = _ref.models) != null ? _ref1.Favorite : void 0 : void 0) || require('zooniverse/models/favorite');
    
      __out.push('\n\n<div class=\'item\'>\n  <a href="');
    
      __out.push(__sanitize(((_ref2 = this.subjects[0]) != null ? _ref2.talkHref() : void 0) || '#/SUBJECT_ERROR'));
    
      __out.push('">\n    ');
    
      location = (_ref3 = this.subjects[0]) != null ? _ref3.location : void 0;
    
      __out.push('\n    ');
    
      thumbSrc = null;
    
      __out.push('\n    ');
    
      if (thumbSrc == null) {
        thumbSrc = location != null ? location.thumb : void 0;
      }
    
      __out.push('\n    ');
    
      if ((location != null ? location.standard : void 0) instanceof Array) {
        if (thumbSrc == null) {
          thumbSrc = location != null ? location.standard[0] : void 0;
        }
      }
    
      __out.push('\n    ');
    
      if (thumbSrc == null) {
        thumbSrc = location != null ? location.standard : void 0;
      }
    
      __out.push('\n    <img src="');
    
      __out.push(__sanitize(thumbSrc || ''));
    
      __out.push('" />\n  </a>\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['profileItem'] = template;
if (typeof module !== 'undefined') module.exports = template;
