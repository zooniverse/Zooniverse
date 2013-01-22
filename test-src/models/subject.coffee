Api = zooniverse.Api
Subject = zooniverse.models.Subject

describe 'Subject', ->
  describe 'with a connected API', ->
    @api = new Api
      project: 'test'
      host: "#{location.protocol}//#{location.host}"
      path: '/test/helpers/proxy#for-subject-tests'

    describe 'path', ->
      afterEach ->
        Subject.group = false

      it 'knows its path without a groups', ->
        expect(Subject.path()).to.equal '/projects/test/subjects'

      it 'knows its path with any group', ->
        Subject.group = true
        expect(Subject.path()).to.equal '/projects/test/groups/subjects'

      it 'knows its path with a specific group', ->
        Subject.group = 'PATH_ID'
        expect(Subject.path()).to.equal '/projects/test/groups/PATH_ID/subjects'

    describe 'fetch', ->
      it 'can fetch more subjects', (done) ->
        Subject.fetch -> done() if Subject.count() is Subject.queueLength

    describe 'next', ->
      beforeEach ->
        Subject.first().destroy() until Subject.count() is 0

      it 'destroys the current subject', (done) ->
        instance = new Subject
        instance.select()

        Subject.one 'fetched', -> done()
        Subject.next()
        expect(instance in Subject.instances).to.be.false

      it 'can get the next subject', (done) ->
        Subject.next -> done() if Subject.current?

      it 'fetches more subjects to refill its queue', (done) ->
        new Subject
        new Subject

        Subject.one 'fetched', ->
          done() if Subject.count() is Subject.queueLength

        Subject.next()
