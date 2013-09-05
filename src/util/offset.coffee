offset = (el, from) ->
  left = 0
  top = 0

  currentElement = el
  while currentElement?
    left += currentElement.offsetLeft unless isNaN currentElement.offsetLeft
    top += currentElement.offsetTop unless isNaN currentElement.offsetTop
    currentElement = currentElement.offsetParent

  left += parseFloat getComputedStyle(document.body.parentNode).marginLeft
  top += parseFloat getComputedStyle(document.body.parentNode).marginTop

  {left, top}

module.exports = offset
