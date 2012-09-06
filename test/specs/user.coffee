User = require './models/user'
Api = require './api'

describe 'User', ->
  beforeEach -> 
    Api.init()
    User.project = "test"
  
  describe 'Not logged in', ->
    it 'should not fetch a user', ->
      userCheck = false
      User.fetch().always -> userCheck = true
      waitsFor -> userCheck
      runs -> expect(User.current).toBe null
  
  describe 'Logged in', ->
    beforeEach ->
      loggedIn = false
      Api.getJSON '/login', -> loggedIn = true
      waitsFor -> loggedIn
    
    afterEach ->
      loggedOut = false
      Api.getJSON '/logout', -> loggedOut = true
      waitsFor -> loggedOut
    
    it 'should fetch a user', ->
      User.fetch().always ->
        expect(User.current.id).toBe '4fff22b8c4039a0901000002'
      waitsFor -> User.current

  describe '#login', ->
    beforeEach ->
      User.current = null

    describe 'with valid password', ->
      it 'should set current user to the login', ->
        User.login({username: 'user', password: 'password'}).always ->
          expect(User.current.id).toBe '4fff22b8c4039a0901000002'
        waitsFor -> User.current

    describe 'with invalid password', ->
      it 'should set the current user to null', ->
        User.login({username: 'user', password: 'password_not'}).always ->
          expect(User.current).toBeNull()

  describe '#logout', ->
    it 'should set User.current to null', ->
      userCheck = false
      User.logout().always -> userCheck = true
      waitsFor -> userCheck
      runs -> expect(User.current).toBeNull()

  describe '#signup', ->
    afterEach ->
      User.current = null

    it 'should submit user info through the api', ->
      spyOn(Api, 'getJSON').andCallThrough()
      User.signup({username: 'test', email: "test@example.com", password: 'password'})
      expect(Api.getJSON).toHaveBeenCalled()

    it 'should return with the current user date', ->
      User.signup({username: 'test', email: "test@example.com", password: 'password'}).always ->
        expect(User.current.id).toBe '4fff22b8c4039a0901000002'
      waitsFor -> User.current
