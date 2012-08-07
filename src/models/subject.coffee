Model = require './model'
Api = require '../api'
$ = require 'jqueryify'
_ = require 'underscore/underscore'

class Subject extends Model
  @configure 'Subject'
  projectName: null
  
  @baseUrl: ->
    if @::projectName
      "/projects/#{ @::projectName }"
    else
      ''
  
  @url: (params) ->
    url = "#{ @baseUrl() }/subjects"
    url += '?' + $.param(params) if params
    url
  
  @fetch: (count = 1) ->
    fetcher = Api.get @url(limit: count), (results) =>
      @create result for result in results

module.exports = Subject
