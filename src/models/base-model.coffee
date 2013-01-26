window.zooniverse ?= {}
window.zooniverse.models ?= {}

EventEmitter = window.zooniverse.EventEmitter || require '../lib/event-emitter'

class BaseModel extends EventEmitter
  @idCounter = -1
  @instances: null

  @count: ->
    @instances ?= []
    @instances.length

  @first: ->
    @instances ?= []
    @instances[0]

  @find: (id) ->
    @instances ?= []
    for instance in @instances
      return instance if instance.id is id

  @search: (query) ->
    @instances ?= []
    for instance in @instances
      miss = false
      for own property, value of query
        if instance[property] isnt value
          miss = true
          break
      continue if miss
      instance

  @destroyAll: ->
    @first().destroy() until @count() is 0

  id: null

  constructor: (params = {}) ->
    super
    @[property] = value for own property, value of params when property of @

    @constructor.idCounter += 1
    @id = "C_#{@constructor.idCounter}" unless @id?

    @constructor.instances ?= []
    @constructor.instances.push @

  destroy: ->
    super
    for instance, i in @constructor.instances when instance is @
      @constructor.instances?.splice i, 1
      break

window.zooniverse.models.BaseModel = BaseModel
module?.exports = BaseModel
