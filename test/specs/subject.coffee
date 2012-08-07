Api = require './api'
Subject = require './models/subject'

class TestSubject extends Subject
  @configure 'TestSubject'
  projectName: 'test'

class OtherSubject extends Subject
  @configure 'OtherSubject'
  projectName: 'other'

describe 'Subject', ->
  beforeEach -> Api.init()
  afterEach ->
    klass.destroyAll() for klass in [TestSubject, OtherSubject, Subject]
  
  mockSubjects = ->
    for val in ['first', 'second', 'third']
      TestSubject.create id: val
      OtherSubject.create id: val
  
  it 'should find all', ->
    mockSubjects()
    subjects = TestSubject.all()
    expect(subjects.length).toBe 3
  
  it 'should find first', ->
    mockSubjects()
    expect(TestSubject.first().id).toBe 'first'
  
  it 'should find last', ->
    mockSubjects()
    expect(TestSubject.last().id).toBe 'third'
  
  it 'should count', ->
    mockSubjects()
    expect(TestSubject.count()).toBe 3
  
  it 'should fetch', ->
    fetched = false
    TestSubject.fetch(2).always -> fetched = true
    waitsFor -> fetched
    
    runs ->
      expect(TestSubject.all().length).toBe 2
      expect(TestSubject.first().id).toBe '4fff2d0fc4039a09f10003e0'
