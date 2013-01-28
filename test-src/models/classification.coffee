Subject = window.zooniverse.models.Subject
Api = window.zooniverse.Api
Classification = window.zooniverse.models.Classification

describe 'Classification', ->
  before ->
    @api = new Api
      project: 'test'
      host: "#{location.protocol}//#{location.host}"
      path: '/doesnt-exist#for-subject-tests'
      loadTimeout: 100

    Subject.destroyAll()

    @subject = new Subject
      id: "SUBJECT_TO_CLASSIFY"
      zooniverse_id: "SUBJECT_TO_CLASSIFY_ZOONIVERSE_ID"
      location: standard: '//placehold.it/'
      coords: [0, 0]
      metadata: {}
      workflow_ids: ['WORKFLOW_ID']

    @classification = new Classification {@subject}

    @classification.annotate foo: 'bar'

    @classification.annotate toJSON: ->
      foo: 'bar'

  after ->
    @api.destroy()

  describe '::toJSON', ->
    before ->
      @wasJSON = JSON.parse(JSON.stringify(@classification)).classification

    it 'knows its annotations', ->
      expect(@wasJSON.annotations[0].foo).to.equal 'bar'

    it 'properly serializes its annotations', ->
      expect(@wasJSON.annotations[1].foo).to.equal 'bar'

    it 'knows when it was created', ->
      expect(@classification.started_at.split(' ')[...4]).to.eql (new Date).toUTCString().split(' ')[...4]

    it 'knows its user agent', ->
      expect(@classification.user_agent).to.equal navigator.userAgent

    it 'knows its user agent', ->
      expect(@classification.user_agent).to.equal navigator.userAgent

    describe 'with a connected API', ->
      describe '::send', ->
        it 'increments the "sentThisSession"'

        it 'creates a recent'

        it 'makes a favorite, if appropriate'

        it 'triggers "send"'

      describe 'sendPending', ->

    describe 'with an offline API', ->
      describe '::send', ->
        it 'adds itself to the "pending" list'

        it 'triggers "send"'
