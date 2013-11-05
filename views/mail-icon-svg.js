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
    
      className = this.className || 'zooniverse-mail-icon';
    
      __out.push('\n\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 100" class="');
    
      __out.push(__sanitize(className));
    
      __out.push('" width="1.5em" height="1em">\n  <g class="');
    
      __out.push(__sanitize(className));
    
      __out.push('" fill="currentColor" stroke="transparent" stroke-width="0">\n    <path d="M 0 0 L 75 65 L 150 0 Z" />\n    <path d="M 0 0 L 75 75 L 150 0 L 150 100 L 0 100 Z" opacity="0.85" />\n  </g>\n</svg>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['mailIconSvg'] = template;
if (typeof module !== 'undefined') module.exports = template;
