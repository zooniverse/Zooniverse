Api = require './api'

describe 'Api', ->
  it 'should have an incrementing id', ->
    expect(Api.nextId()).toBe 'api-0'
    expect(Api.nextId()).toBe 'api-1'
  
  it 'should append a proxy frame', ->
    Api.init()
    waitsFor -> Api.ready
    
    runs ->
      iframe = $('iframe')
      expect(iframe.length).toEqual 1
      expect(iframe).toHaveId 'api-proxy-frame'
      expect(iframe).toHaveAttr 'src', "#{ Api.host }/proxy"
      expect(iframe).toBeHidden()
  
  it 'should handle successful requests', ->
    Api.init()
    waitsFor -> Api.ready
    
    runs ->
      done = jasmine.createSpy()
      fail = jasmine.createSpy()
      Api.getJSON '/projects/foo/current_user', done, fail
      
      waitsFor ->
        done.wasCalled or fail.wasCalled
      
      runs ->
        expect(done).toHaveBeenCalled()
        expect(fail).not.toHaveBeenCalled()
