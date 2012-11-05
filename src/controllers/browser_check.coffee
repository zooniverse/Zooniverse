$ = require 'jqueryify'

class BrowserCheck
  view: """
    <div class="zooniverse-browser-warning">
      <section>
        <div class="summary">
          <p>#{ I18n.t 'zooniverse.browser_check.wont_work' }</p>
        </div>

        <div class="recommend">
          <p>#{ I18n.t 'zooniverse.browser_check.recommended' }</p>
        </div>

        <div class="ie">
          <p>#{ I18n.t 'zooniverse.browser_check.ie' }</p>
          <p>#{ I18n.t 'zooniverse.browser_check.chrome_frame' }</p>
        </div>

        <div class="action">
          <p><button name="dismiss">#{ I18n.t 'zooniverse.browser_check.dismiss' }</button></p>
        </div>
      </section>
    </div>
  """

  support:
    mozilla: 14
    msie: 8
    webkit: 530 # TODO: Check mobile versions
    opera: Infinity

  constructor: (params = {}) ->
    @[property] = value for own property, value of params

    @el ?= $(@view)
    @el.on 'click', 'button[name="dismiss"]', @dismiss

  check: ->
    @warn() unless @supported()

  supported: ->
    version = parseFloat $.browser.version

    for vendor of $.browser when vendor of @support
      supportedVersion = @support[vendor]

    return version >= supportedVersion

  warn: ->
    @el.appendTo 'body'

  dismiss: =>
    @el.remove()

module.exports = BrowserCheck
