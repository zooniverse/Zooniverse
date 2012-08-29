$ = require 'jqueryify'
Dialog = require './dialog'

module.exports =
  init: ->
    $(document).on 'click', '[data-popup]', (e) ->
      target = $(e.currentTarget)

      [contentNode, position, className] = target.attr('data-popup').split /\s+/
      contentNode = $(contentNode)

      # targetOffset = contentNode.offset()
      # targetWidth = target.width()
      # targetHeight = target.height()

      # isLeft = targetOffset.left < innerWidth / 2
      # isRight = targetOffset.left + targetWidth > innerWidth / 2
      # isHigh = targetOffset.top < innerHeight / 2
      # isLow = targetOffset.top + targetHeight > innerHeight / 2

      switch position
        when 'top'
          attachment = {y: 'bottom', to: target, at: y: 'top'}
          arrowDirection = 'bottom'
        when 'right'
          attachment = {x: 'left', to: target, at: x: 'right'}
          arrowDirection = 'left'
        when 'bottom'
          attachment = {y: 'top', to: target, at: y: 'bottom'}
          arrowDirection = 'top'
        when 'left'
          attachment = {x: 'right', to: target, at: x: 'left'}
          arrowDirection = 'right'

      popup = new Dialog
        className: 'popup'
        title: contentNode.attr 'title'
        content: contentNode.html()
        attachment: attachment
        arrowDirection: arrowDirection
        buttons: []
        callback: -> popup.destroy()

      popup.el.addClass className if className?

      popup.open()
