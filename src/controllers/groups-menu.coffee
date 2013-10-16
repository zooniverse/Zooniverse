Controller = window.zooniverse?.controllers?.BaseController || require './base-controller'
User = window.zooniverse?.models?.User || require '../models/user'
template = window.zooniverse?.views?.groupsMenu || require '../views/groups-menu'
$ = window.jQuery
Dropdown = window.zooniverse?.controllers?.Dropdown || require './dropdown'

class GroupsMenu extends Controller
  className: 'zooniverse-groups-menu'

  events:
    'click button[name="user-group"]': 'onClickGroupButton'

  constructor: ->
    super
    User.on 'change', @onUserChange
    User.on 'change-group', @onUserChangeGroup

  onUserChange: (e, user) =>
    if user?
      @el.html template user

      if user.user_group_id
       @el.find("button[name='#{user.user_group_id}']").click()

  onUserChangeGroup: (e, user, group) =>
    buttons = @el.find 'button[name="user-group"]'
    buttons.removeClass 'active'

    if group?
      buttons.filter("[value='#{group.id}']").addClass 'active'

  onClickGroupButton: (e) ->
    target = $(e.currentTarget)
    User.current?.setGroup target.val() || 'TODO_HOW_DO_I_STOP_CLASSIFYING_AS_PART_OF_A_GROUP'
    Dropdown.closeAll()

window.zooniverse ?= {}
window.zooniverse.controllers ?= {}
window.zooniverse.controllers.GroupsMenu = GroupsMenu
module?.exports = GroupsMenu
