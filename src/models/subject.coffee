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
  
  @fetch: (count) ->
    fetcher = Api.get @url(limit: count), (results) =>
      @create result for result in results
  
  @all: ->
    @findAllByAttribute 'projectName', @::projectName
  
  @count: -> @all().length
  @first: -> @all()[0]
  @last: -> _(@all()).last()

module.exports = Subject
