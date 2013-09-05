toggleClass = (element, className, condition) ->
  classList = element.className.split /\s+/
  contained = className in classList

  condition ?= !contained
  condition = !!condition

  if not contained and condition is true
    classList.push className

  if contained and condition is false
    classList.splice classList.indexOf(className), 1

  element.className = classList.join ' '
  null

window.zooniverse ?= {}
window.zooniverse.util ?= {}
window.zooniverse.util.toggleClass = toggleClass
module?.exports = toggleClass
