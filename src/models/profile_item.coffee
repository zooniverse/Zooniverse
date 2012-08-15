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
    @subjects = new Subject @subjects[0]

  @fetch: ->
    url = @url()
    fetcher = Api.get url, @fromJSON
    fetcher

module.exports = ProfileItem
