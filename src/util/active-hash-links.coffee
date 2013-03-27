window.zooniverse ?= {}
window.zooniverse.util ?= {}

$ = window.jQuery

# Give links a class when they match the current hash.

className = 'active'
root = document

anchors = $()

updateClasses = ->
  anchors.removeClass className

  anchors = $("a[href='#{location.hash}']")
  anchors.addClass className

init = (newClassName = className, newRoot = root) ->
  [className, root] = [newClassName, newRoot]

  updateClasses()
  $(window).on 'hashchange', updateClasses

activeHashLinks = {updateClasses, init}

window.zooniverse.util.activeHashLinks = activeHashLinks
module?.exports = activeHashLinks
