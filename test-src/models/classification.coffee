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

    @tutorial = new Subject
      id: "TUTORIAL_TO_CLASSIFY"
      zooniverse_id: "TUTORIAL_TO_CLASSIFY_ZOONIVERSE_ID"
      location: standard: '//placehold.it/'
      coords: [0, 0]
      metadata: tutorial: true
      workflow_ids: ['WORKFLOW_ID']

  after ->
    @api.destroy()

  describe 'with multiple subjects', ->
    before ->
      @subject1 = @subject
      @subject2 = new Subject
        id: "SUBJECT_TO_CLASSIFY_2"
        zooniverse_id: "SUBJECT_TO_CLASSIFY_ZOONIVERSE_ID_2"
        location: standard: '//placehold.it/'
        coords: [0, 0]
        metadata: {}
        workflow_ids: ['WORKFLOW_ID']

      @classification = new Classification subjects: [@subject1, @subject2]
      @classification.annotate foo: 'bar'
      @classification.annotate bar: 'baz'
      @wasJSON = JSON.parse(JSON.stringify(@classification)).classification

    it 'should normalize subjects', ->
      expect(@classification.subject.id).to.equal @subject1.id

    it 'sets subject ids', ->
      expect(@wasJSON.subject_ids[0]).to.equal @subject1.id
      expect(@wasJSON.subject_ids[1]).to.equal @subject2.id

    it 'knows the creation endpoint', ->
      expect(@classification.url()).to.equal "/projects/test/workflows/#{ @subject.workflow_ids[0] }/classifications"

    it 'should know when it is a tutorial', ->
      tutorialClassification = new Classification subjects: [@subject, @tutorial]
      expect(tutorialClassification.isTutorial()).to.equal true

    it 'should know when it is not a tutorial', ->
      expect(@classification.isTutorial()).to.equal false

    it 'creates a recent'

    it 'makes a favorite, if appropriate'

  describe '::toJSON', ->
    before ->
      @classification = new Classification subject: @subject
      @classification.annotate foo: 'bar'
      @classification.annotate bar: 'baz'
      @wasJSON = JSON.parse(JSON.stringify(@classification)).classification

    it 'should normalize subjects', ->
      expect(@classification.subjects.length).to.equal 1
      expect(@classification.subjects[0].id).to.equal @subject.id

    it 'sets subject ids', ->
      expect(@wasJSON.subject_ids[0]).to.equal @subject.id

    it 'knows the creation endpoint', ->
      expect(@classification.url()).to.equal "/projects/test/workflows/#{ @subject.workflow_ids[0] }/classifications"

    it 'should know when it is a tutorial', ->
      tutorialClassification = new Classification subject: @tutorial
      expect(tutorialClassification.isTutorial()).to.equal true

    it 'should know when it is not a tutorial', ->
      expect(@classification.isTutorial()).to.equal false

    it 'knows its annotations', ->
      expect(@wasJSON.annotations[0].foo).to.equal 'bar'

    it 'properly serializes its annotations', ->
      expect(@wasJSON.annotations[1].bar).to.equal 'baz'

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
