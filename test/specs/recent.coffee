Recent = require './models/recent'
User = require './models/user'
Api = require './api'

describe 'Recent', ->
  beforeEach ->
    Api.init()

  it 'should be defined', ->
    expect(Recent).toBeDefined()

  it 'should be instantiable', ->
    recent = new Recent
    expect(recent).not.toBeNull()

  describe '#fetch', ->
    beforeEach ->
      User.project = 'test'
      User.current = 
        id: '1'

    it 'should retrieve recents from the user', ->
      spyOn(Api, 'get')
      Recent.fetch()
      expect(Api.get).toHaveBeenCalled() #With('/projects/test/users/1/recents')

    it 'should create records from the return JSON', ->
      fetchCheck = false
      Recent.fetch().always -> fetchCheck = true
      waitsFor -> fetchCheck
      runs -> 
        console.log Recent.first()
        expect(Recent.first()).not.toBeNull()
        expect(Recent.all()).not.toBe []
