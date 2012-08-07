Model = require './model'
Api = require '../api'
$ = require 'jqueryify'
_ = require 'underscore/underscore'

class Group extends Model
  @configure 'Group'
  projectName: null
  type: null
  
  @url: (params) -> @withParams "/projects/#{ @::projectName }/groups", params
  
  @index: (opts = { }) ->
    opts = _(page: 1, per_page: 5).extend opts
    Api.get @url(opts), (results) =>
      @create result for result in results
  
  @show: (id) ->
    Api.get "#{ @url() }/#{ id }", (result) =>
      @create result

module.exports = Group
