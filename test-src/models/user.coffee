Api = window.zooniverse.Api
User = window.zooniverse.models.User

describe 'User', ->
  describe 'on a failed API', ->
    before ->
      @api = new Api
        project: 'test'
        host: "#{location.protocol}//#{location.host}"
        path: '/bad-path-for-user-tests'
        loadTimeout: 0

    beforeEach ->
      User.current?.destroy?()
      User.current = false

    describe 'fetch', ->
      it 'triggers "change" with no current user', (done) ->
        User.one 'change', (e, user) ->
          expect(user).to.be.null
          done()

        User.fetch()

      it 'triggers "sign-in-error"', (done) ->
        User.one 'sign-in-error', ->
          done()

        User.fetch()

  describe 'on an available API', ->
    before ->
      @api = new Api
        project: 'test'
        host: "#{location.protocol}//#{location.host}"
        path: '/test/helpers/proxy#for-user-tests'

    describe 'fetch (when signed in)', ->
      it 'triggers "change" with the current user', (done) ->
        User.one 'change', (e, user) ->
          expect(user.name).to.equal 'clyde'
          expect(User.current).to.equal user
          done()

        User.fetch()

    describe 'signup', ->
      describe 'when given insufficient data', ->
        it 'triggers "sign-in-error"', (done) ->
          User.one 'sign-in-error', ->
            done()

          User.signup username: 'tester', password: 'testing'

      describe 'when given all required data', ->
        it 'triggers "change" with the new current user', (done) ->
          username = 'tester'
          password = 'testing'
          email = 'test@test.test'

          User.one 'change', (e, user) ->
            expect(user.name).to.equal username
            expect(User.current).to.equal user
            done()

          User.signup {username, password, email}

    describe 'logout', ->
      it 'triggers "change" with no user and un-sets the current user', (done) ->
        User.one 'change', (e, user) ->
          expect(user).to.be.null
          expect(User.current).to.be.null
          done()

        User.logout()

    describe 'fetch (when not logged in)', ->
      it 'triggers "sign-in-error"', (done) ->
        User.one 'sign-in-error', ->
          done()

        User.fetch()

    describe 'login', ->
      describe 'with a bad username or password', ->
        it 'triggers "sign-in-error"', (done) ->
          User.one 'sign-in-error', ->
            done()

          User.login username: 'nobody', password: 'nothing'

      describe 'with a good username and password', ->
        it 'triggers "change" with the current user', (done) ->
          username = 'tester'
          password = 'testing'

          User.one 'change', (e, user) ->
            expect(user.name).to.equal username
            done() if user? and User.current? and user is User.current

          User.login {username, password}
