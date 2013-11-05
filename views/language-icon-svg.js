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
      var className;
    
      className = this.className || 'zooniverse-language-icon';
    
      __out.push('\n\n<svg viewBox="0 0 100 100" class="');
    
      __out.push(__sanitize(className));
    
      __out.push('" width="1.25em" height="1.25em">\n  <!--TODO: This icon is still not so great.-->\n  <g transform="translate(50, 50)" fill="transparent" stroke="currentColor" stroke-width="8">\n    <circle r="45"></circle>\n    <ellipse rx="43" ry="23"></ellipse>\n    <ellipse rx="23" ry="43"></ellipse>\n    <path d="M -43 0 L 43 0 M 0 -43 L 0 43"></path>\n  </g>\n</svg>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['languageIconSvg'] = template;
if (typeof module !== 'undefined') module.exports = template;
