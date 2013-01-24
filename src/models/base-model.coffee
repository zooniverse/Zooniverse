window.zooniverse ?= {}
window.zooniverse.models ?= {}

EventEmitter = zooniverse.EventEmitter || require '../lib/event-emitter'

class BaseModel extends EventEmitter
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

  constructor: (params = {}) ->
    # if 'id' of params and !!@constructor.find params.id
    #   throw new Error "Model #{params.id} already exists"

    @[property] = value for own property, value of params when property of @
    @constructor.instances ?= []
    @constructor.instances.push @

  destroy: ->
    super

    for instance, i in @constructor.instances when instance is @
      @constructor.instances?.splice i, 1
      break

window.zooniverse.models.BaseModel = BaseModel
module?.exports = BaseModel
