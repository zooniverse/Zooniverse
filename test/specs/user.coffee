User = require './models/user'
Api = require './api'

describe 'User', ->
  describe 'Not logged in', ->
    it 'should not fetch a user', ->
      User.fetch (user) ->
        expect(User.current).toBeFalsy()
  
  describe 'Logged in', ->
    it 'should fetch a user', ->
      Api.getJSON '/login', ->
        User.fetch (user) ->
          expect(User.current).toBeTruthy()
