$ = require 'jqueryify'

# Give links a class when they match the current hash.

className = 'active'
root = document
anchors = $()

updateClasses = ->
  anchors.removeClass className

  anchors = $("a[href^='#{location.hash}']")
  anchors.addClass className

module.exports =
  init: (newClassName = className, newRoot = root) ->
    [className, root] = [newClassName, newRoot]

    updateClasses()
    $(window).on 'hashchange', updateClasses
