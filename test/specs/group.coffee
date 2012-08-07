Api = require './api'
Subject = require './models/subject'
Group = require './models/group'

class GalaxyZooSubject extends Subject
  @configure 'GalaxyZooSubject', 'coords', 'location', 'metadata', 'zooniverse_id'
  projectName: 'galaxy_zoo'

class GalaxyZooSurveyGroup extends Group
  @configure 'GalaxyZooSurveyGroup', 'name', 'categories', 'metadata', 'zooniverse_id', 'stats'
  projectName: 'galaxy_zoo'
  type: 'survey'

describe 'Group', ->
  beforeEach -> Api.init()
  afterEach -> GalaxyZooSurveyGroup.destroyAll()
  
  describe 'index', ->
    it 'should fetch', ->
      fetched = false
      GalaxyZooSurveyGroup.index().always -> fetched = true
      waitsFor -> fetched
      runs -> expect(GalaxyZooSurveyGroup.count()).toBe 2
    
    it 'should paginate', ->
      fetched = false
      GalaxyZooSurveyGroup.index(page: 1, per_page: 1).always -> fetched = true
      
      waitsFor -> fetched
      runs ->
        expect(GalaxyZooSurveyGroup.count()).toBe 1
        expect(GalaxyZooSurveyGroup.first().name).toBe 'CANDELS'
  
  describe 'show', ->
    it 'should find the group', ->
      fetched = false
      GalaxyZooSurveyGroup.show('50217561516bcb0fda00000d').always -> fetched = true
      waitsFor -> fetched
      runs ->
        expect(GalaxyZooSurveyGroup.count()).toBe 1
        expect(GalaxyZooSurveyGroup.first().id).toBe '50217561516bcb0fda00000d'
