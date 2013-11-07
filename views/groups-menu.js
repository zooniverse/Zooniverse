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
      var id, name, _i, _len, _ref, _ref1;
    
      __out.push('<div class="user-groups">\n  ');
    
      _ref = this.user_groups || [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], id = _ref1.id, name = _ref1.name;
        __out.push('\n    <div class="user-group">\n      <button name="user-group" value="');
        __out.push(__sanitize(id));
        __out.push('" ');
        if (id === this.user_group_id) {
          __out.push('class="active"');
        }
        __out.push('>');
        __out.push(__sanitize(name));
        __out.push('</button>\n    </div>\n  ');
      }
    
      __out.push('\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
window.zooniverse.views['groupsMenu'] = template;
if (typeof module !== 'undefined') module.exports = template;
