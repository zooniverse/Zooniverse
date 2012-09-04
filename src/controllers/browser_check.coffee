$ = require 'jqueryify'

class BrowserCheck
  view: '''
    <div class="zooniverse-browser-warning">
      <section>
        <div class="summary">
          <p>This site probably won't work until you update your browser.</p>
        </div>

        <div class="recommend">
          <p>We recommend using <a href="http://www.mozilla.org/firefox/" target="_blank">Mozilla Firefox</a> or <a href="http://www.google.com/chrome" target="_blank">Google Chrome</a>.</p>
        </div>

        <div class="ie">
          <p>If you use <a href="http://www.microsoft.com/windows/internet-explorer/" target="_blank">Microsoft Internet Explorer</a>, make sure you're running the latest version.</p>
          <p>If you can't install the latest Internet Explorer, try <a href="http://google.com/chromeframe" target="_blank">Chrome Frame</a>!</p>
        </div>

        <div class="action">
          <p><button name="dismiss">Dismiss</button></p>
        </div>
      </section>
    </div>
  '''

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
