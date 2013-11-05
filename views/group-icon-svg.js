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
    
      className = this.className || 'zooniverse-group-icon';
    
      __out.push('\n\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 100" class="');
    
      __out.push(__sanitize(className));
    
      __out.push('" width="2em" height="1em">\n  ');
    
      if (document.getElementById('zooniverse-groups-icon-person') == null) {
        __out.push('\n    <defs>\n      <path id="zooniverse-groups-icon-person" d="M 0 -50 A 25 35 0 0 1 20 10 A 67 67 0 0 1 50 45 L 0 50 L -50 45 A 67 67 0 0 1 -20 10 A 25 35 0 0 1 0 -50 Z" />\n    </defs>\n  ');
      }
    
      __out.push('\n\n  <g class="');
    
      __out.push(__sanitize(className));
    
      __out.push('" fill="currentColor" stroke="transparent" stroke-width="0" transform="translate(100, 50)">\n    <use xlink:href="#zooniverse-groups-icon-person" transform="scale(0.67) translate(-80, 0)" opacity="0.75" />\n    <use xlink:href="#zooniverse-groups-icon-person" transform="scale(0.67) translate(80, 0)" opacity="0.75" />\n    <use xlink:href="#zooniverse-groups-icon-person" />\n  </g>\n</svg>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['groupIconSvg'] = template;
if (typeof module !== 'undefined') module.exports = template;
