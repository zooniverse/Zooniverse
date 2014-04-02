Api = window.zooniverse.Api
Subject = window.zooniverse.models.Subject

describe 'Subject', ->
  describe 'with a failed API', ->
    before ->
      new Api
        project: 'test'
        host: "#{location.protocol}//#{location.host}"
        path: '/doesnt-exist#for-subject-tests'
        loadTimeout: 100

    after ->
      Api.current.destroy()
      Subject.destroyAll()
      Subject.seenThisSession = []

    describe 'fetch', ->
      Subject.fallback = './helpers/offline/subjects.json'

      it 'falls back to a static subject list', (done) ->
        Subject.one 'fetch', (e, subjects) ->
          expect(Subject.count()).not.to.equal 0
          done()

        Subject.fetch()

  describe 'with a connected API', ->
    before ->
      new Api
        project: 'test'
        host: "#{location.protocol}//#{location.host}"
        path: '/test/helpers/proxy#for-subject-tests'

    after ->
      Api.current.destroy()
      Subject.destroyAll()
      Subject.seenThisSession = []

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
        Subject.one 'fetch', (e, subjects) ->
          expect(subjects.length).not.to.equal 0
          expect(Subject.count()).not.to.equal 0
          expect(subjects[0]).to.equal Subject.first()
          expect(Subject.seenThisSession).to.have.members(subject.zooniverse_id for subject in subjects)
          done()

        Subject.fetch()

    describe 'next', ->
      beforeEach ->
        Subject.destroyAll()
        Subject.seenThisSession = []

      it 'destroys the current subject and selects the next', (done) ->
        first = new Subject
        second = new Subject

        first.select()

        Subject.one 'select', (e, subject) ->
          expect(first in Subject.instances).to.be.false
          expect(subject is second).to.be.true
          expect(Subject.current).to.equal second
          done()

        Subject.next()

      it 'fetches more subjects to refill its queue', (done) ->
        new Subject

        Subject.one 'fetch', (e, subjects) ->
          expect(Subject.count()).to.equal Subject.queueMax
          expect(Subject.seenThisSession).to.have.members(subject.zooniverse_id for subject in subjects)
          done()

        Subject.next()
