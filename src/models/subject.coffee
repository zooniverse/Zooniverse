Model = require './model'
Api = require '../api'
$ = require 'jqueryify'
_ = require 'underscore/underscore'

class Subject extends Model
  @configure 'Subject', 'zooniverse_id', 'coords', 'location', 'metadata'
  projectName: null
  
  @url: (params) -> @withParams "/projects/#{ @::projectName }/subjects", params
  
  @fetch: (count = 1) ->
    fetcher = Api.get @url(limit: count), (results) =>
      @create result for result in results

module.exports = Subject
