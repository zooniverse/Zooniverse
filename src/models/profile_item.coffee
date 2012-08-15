Api = require '../api'
Model = require './model'
User = require './user'
Subject = require './subject'

class ProfileItem extends Model
  @configure "ProfileItem", "project_id", "workflow_id", "subjects", "created_at"

  constructor: ->
    super
    @convertSubjects() if @subjects
    @convertDates() if @created_at

  convertSubjects: ->
    @subjects = new Subject @subjects[0] if @subjects[0]

  convertDates: ->
    @created_at = new Date @created_at if @created_at

  @fetch: ->
    url = @url()
    fetcher = Api.get url, @fromJSON
    fetcher

module.exports = ProfileItem
