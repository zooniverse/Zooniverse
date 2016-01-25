window.zooniverse ?= {}
window.zooniverse.controllers ?= {}
window.zooniverse.views ?= {}

$ = window.jQuery

class Footer
  el: null
  template: window.zooniverse.views.footer || require '../views/footer'

  projectJsonUrl: 'https://zooniverse-demo.s3.amazonaws.com/projects.json'

  sourceLink: 'https://github.com/zooniverse'
  privacyLink: 'https://www.zooniverse.org/privacy'

  constructor: (params) ->
    @[key] = value for key, value of params

    @el = $(document.createElement 'div')
    @el.addClass 'zooniverse-footer'
    @render()

    @fetchProjects()

  fetchProjects: =>
    $.getJSON @projectJsonUrl, (@categories) =>
      @render()

  render: =>
    @el.html @template @

window.zooniverse.controllers.Footer = Footer
module?.exports = Footer
