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
    
      className = this.className || 'zooniverse-logo';
    
      __out.push('\n\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="');
    
      __out.push(__sanitize(className));
    
      __out.push('" width="1em" height="1em">\n  <g class="');
    
      __out.push(__sanitize(className));
    
      __out.push('" fill="currentColor" stroke="transparent" stroke-width="0" transform="translate(50, 50)">\n    <path d="M 0 -45 A 45 45 0 0 1 0 45 A 45 45 0 0 1 0 -45 Z M 0 -30 A 30 30 0 0 0 0 30 A 30 30 0 0 0 0 -30 Z" />\n    <path d="M 0 -12.5 A 12.5 12.5 0 0 1 0 12.5 A 12.5 12.5 0 0 1 0 -12.5 Z" />\n    <path d="M 0 -75 L 5 0 L 0 75 L -5 0 Z" transform="rotate(50)" />\n  </g>\n</svg>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['zooniverseLogoSvg'] = template;
if (typeof module !== 'undefined') module.exports = template;
