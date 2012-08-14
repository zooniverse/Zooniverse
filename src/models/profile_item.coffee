Api = require '../api'
Model = require './model'
User = require './user'
Subject = require './subject'

class ProfileItem extends Model
  @configure "ProfileItem", "project_id", "workflow_id", "subjects"

  constructor: ->
    super
    @convertSubjects() if @subjects

  convertSubjects: ->
    for subject of @subjects
      @subjects = new Subject subject

  @fetch: ->
    url = @url()
    fetcher = Api.getJSON url, @fromJSON
    fetcher

module.exports = ProfileItem
