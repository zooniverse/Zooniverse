window.zooniverse ?= {}
window.zooniverse.controllers ?= {}
window.zooniverse.views ?= {}

template = window.zooniverse.views.footer || require '../views/footer'

$ = window.jQuery

$window = $(window)

window.DEFINE_ZOONIVERSE_PROJECT_LIST = (categories) ->
  $window.trigger 'get-zooniverse-project-list', [categories]

class Footer
  el: null

  projectScript: 'http://zooniverse-demo.s3-website-us-east-1.amazonaws.com/projects.js'

  constructor: ->
    @el = $(document.createElement 'div')
    @el.addClass 'zooniverse-footer'
    @el.html template

    $window.on 'get-zooniverse-project-list', @onFetch

    @fetchProjects()

  fetchProjects: ->
    $.getScript @projectScript

  onFetch: (e, categories) =>
    @el.html template {categories}

window.zooniverse.controllers.Footer = Footer
module?.exports = Footer
