window.zooniverse ?= {}
window.zooniverse.models ?= {}

EventEmitter = zooniverse.EventEmitter || require '../lib/event-emitter'

class BaseModel extends EventEmitter
  @instances: null

  @count: ->
    @instances?.length || 0

  @first: ->
    @instances[0]

  constructor: (params = {}) ->
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
