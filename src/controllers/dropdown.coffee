toggleClass = zooniverse.util?.toggleClass || require '../util/toggle-class'

class Dropdown
  @buttonClass: 'zooniverse-dropdown-button'
  @menuClass: 'zooniverse-dropdown-menu'

  @instances: []
  @elements: []

  @closeAll: ({except} = {}) ->
    for instance in @instances
      instance.close() unless instance is except

  addEventListener 'mousedown', (e) =>
    shouldClose = true

    node = e.target.correspondingUseElement || e.target
    while node?
      if node in @elements
        shouldClose = false
        break
      node = node.parentNode

    if shouldClose
      @closeAll()

  button: null
  buttonClass: ''
  buttonTag: 'button'

  menu: null
  menuClass: ''
  menuTag: 'div'

  buttonPinning: [0.5, 1]
  menuPinning: [0.5, 0]

  _open: null
  openClass: 'open'

  animationDelay: 250

  constructor: (params = {}) ->
    window.dropdown = @

    @[property] = value for property, value of params

    @button ?= document.createElement @buttonTag
    toggleClass @button, @constructor.buttonClass, true
    toggleClass @button, @className, true if @className
    @button.addEventListener 'click', @onButtonClick, false

    @menu ?= document.createElement @menuTag
    toggleClass @menu, @constructor.menuClass, true
    toggleClass @menu, @menuClass, true if @menuClass
    @menu.style.position = 'absolute'

    @menu.style.display = 'none'
    document.body.appendChild @menu
    @close()

    @constructor.instances.push @
    @constructor.elements.push @button
    @constructor.elements.push @menu

  onButtonClick: (e) =>
    @toggle()

  toggle: ->
    if @_open then @close() else @open()

  open: ->
    @constructor.closeAll except: @
    toggleClass @button, @openClass, true
    @menu.style.display = ''
    @positionMenu()
    setTimeout => toggleClass @menu, @openClass, true; @_open = true

    addEventListener 'resize', @onResize, false

  positionMenu: ->
    buttonOffset = @button.getBoundingClientRect()
    @menu.style.left = ((buttonOffset.left + pageXOffset) + (@button.offsetWidth * @buttonPinning[0])) - (@menu.offsetWidth * @menuPinning[0]) + 'px'
    @menu.style.top = ((buttonOffset.top + pageYOffset) + (@button.offsetHeight * @buttonPinning[1])) - (@menu.offsetHeight * @menuPinning[1]) + 'px'

  onResize: =>
    @positionMenu()

  close: ->
    toggleClass @button, @openClass, false
    toggleClass @menu, @openClass, false
    setTimeout (=> @menu.style.display = 'none'; @_open = false), @animationDelay

    removeEventListener 'resize', @onResize, false

  destroy: ->
    @constructor.instances.splice @constructor.instances.indexOf(@), 1
    @constructor.elements.splice @constructor.instances.indexOf(@button), 1
    @constructor.elements.splice @constructor.instances.indexOf(@menu), 1

    @button.removeEventListener 'click', @onButtonClick, false
    @button.parentNode?.removeChild @button
    @menu.parentNode?.removeChild @menu

window.zooniverse ?= {}
window.zooniverse.controllers ?= {}
window.zooniverse.controllers.Dropdown = Dropdown
module?.exports = Dropdown
