// Generated by CoffeeScript 1.6.3
(function() {
  var Api, Classification, Subject;

  Subject = window.zooniverse.models.Subject;

  Api = window.zooniverse.Api;

  Classification = window.zooniverse.models.Classification;

  describe('Classification', function() {
    before(function() {
      this.api = new Api({
        project: 'test',
        host: "" + location.protocol + "//" + location.host,
        path: '/doesnt-exist#for-subject-tests',
        loadTimeout: 100
      });
      Subject.destroyAll();
      this.subject = new Subject({
        id: "SUBJECT_TO_CLASSIFY",
        zooniverse_id: "SUBJECT_TO_CLASSIFY_ZOONIVERSE_ID",
        location: {
          standard: '//placehold.it/'
        },
        coords: [0, 0],
        metadata: {},
        workflow_ids: ['WORKFLOW_ID']
      });
      return this.tutorial = new Subject({
        id: "TUTORIAL_TO_CLASSIFY",
        zooniverse_id: "TUTORIAL_TO_CLASSIFY_ZOONIVERSE_ID",
        location: {
          standard: '//placehold.it/'
        },
        coords: [0, 0],
        metadata: {
          tutorial: true
        },
        workflow_ids: ['WORKFLOW_ID']
      });
    });
    after(function() {
      return this.api.destroy();
    });
    describe('with multiple subjects', function() {
      before(function() {
        this.subject1 = this.subject;
        this.subject2 = new Subject({
          id: "SUBJECT_TO_CLASSIFY_2",
          zooniverse_id: "SUBJECT_TO_CLASSIFY_ZOONIVERSE_ID_2",
          location: {
            standard: '//placehold.it/'
          },
          coords: [0, 0],
          metadata: {},
          workflow_ids: ['WORKFLOW_ID']
        });
        this.classification = new Classification({
          subjects: [this.subject1, this.subject2]
        });
        this.classification.annotate({
          foo: 'bar'
        });
        this.classification.annotate({
          bar: 'baz'
        });
        return this.wasJSON = JSON.parse(JSON.stringify(this.classification)).classification;
      });
      it('should normalize subjects', function() {
        return expect(this.classification.subject.id).to.equal(this.subject1.id);
      });
      it('sets subject ids', function() {
        expect(this.wasJSON.subject_ids[0]).to.equal(this.subject1.id);
        return expect(this.wasJSON.subject_ids[1]).to.equal(this.subject2.id);
      });
      it('knows the creation endpoint', function() {
        return expect(this.classification.url()).to.equal("/projects/test/workflows/" + this.subject.workflow_ids[0] + "/classifications");
      });
      it('should know when it is a tutorial', function() {
        var tutorialClassification;
        tutorialClassification = new Classification({
          subjects: [this.subject, this.tutorial]
        });
        return expect(tutorialClassification.isTutorial()).to.equal(true);
      });
      it('should know when it is not a tutorial', function() {
        return expect(this.classification.isTutorial()).to.equal(false);
      });
      it('creates a recent');
      return it('makes a favorite, if appropriate');
    });
    return describe('::toJSON', function() {
      before(function() {
        this.classification = new Classification({
          subject: this.subject
        });
        this.classification.annotate({
          foo: 'bar'
        });
        this.classification.annotate({
          bar: 'baz'
        });
        return this.wasJSON = JSON.parse(JSON.stringify(this.classification)).classification;
      });
      it('should normalize subjects', function() {
        expect(this.classification.subjects.length).to.equal(1);
        return expect(this.classification.subjects[0].id).to.equal(this.subject.id);
      });
      it('sets subject ids', function() {
        return expect(this.wasJSON.subject_ids[0]).to.equal(this.subject.id);
      });
      it('knows the creation endpoint', function() {
        return expect(this.classification.url()).to.equal("/projects/test/workflows/" + this.subject.workflow_ids[0] + "/classifications");
      });
      it('should know when it is a tutorial', function() {
        var tutorialClassification;
        tutorialClassification = new Classification({
          subject: this.tutorial
        });
        return expect(tutorialClassification.isTutorial()).to.equal(true);
      });
      it('should know when it is not a tutorial', function() {
        return expect(this.classification.isTutorial()).to.equal(false);
      });
      it('knows its annotations', function() {
        return expect(this.wasJSON.annotations[0].foo).to.equal('bar');
      });
      it('properly serializes its annotations', function() {
        return expect(this.wasJSON.annotations[1].bar).to.equal('baz');
      });
      it('knows when it was created', function() {
        return expect(this.classification.started_at.split(' ').slice(0, 4)).to.eql((new Date).toUTCString().split(' ').slice(0, 4));
      });
      it('knows its user agent', function() {
        return expect(this.classification.user_agent).to.equal(navigator.userAgent);
      });
      it('knows its user agent', function() {
        return expect(this.classification.user_agent).to.equal(navigator.userAgent);
      });
      describe('with a connected API', function() {
        describe('::send', function() {
          it('increments the "sentThisSession"');
          it('creates a recent');
          it('makes a favorite, if appropriate');
          return it('triggers "send"');
        });
        return describe('sendPending', function() {});
      });
      return describe('with an offline API', function() {
        return describe('::send', function() {
          it('adds itself to the "pending" list');
          return it('triggers "send"');
        });
      });
    });
  });

}).call(this);
