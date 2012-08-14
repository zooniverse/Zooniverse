Recent = require './models/recent'
ProfileItem = require './models/profile_item'
User = require './models/user'
Api = require './api'
Subject = require './models/subject'

describe 'Recent', ->
  beforeEach ->
    Api.init()

  it 'should be defined', ->
    expect(Recent).toBeDefined()

  it 'should be instantiable', ->
    recent = new Recent
    expect(recent).not.toBeNull()

  describe '#fetch', ->
    it 'should create records from the return JSON', ->
      User.current = {id: 1}
      User.project = 'test'
      fetchCheck = false
      Recent.fetch().always -> fetchCheck = true
      waitsFor -> fetchCheck
      runs -> 
        expect(Recent.first()).not.toBeNull()
        expect(Recent.first().subjects).toEqual(jasmine.any(Subject))
