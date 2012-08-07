Spine = require 'spine'

class Model extends Spine.Model
  @withParams: (url = '', params) ->
    url += '?' + $.param(params) if params
    url

module.exports = Model
