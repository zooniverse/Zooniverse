window.zooniverse ?= {}
window.zooniverse.controllers ?= {}

Dialog = zooniverse.controllers.Dialog || require './dialog'
$ = window.jQuery

browserOrder = ['opera', 'chrome', 'safari', 'firefox', 'msie']

defaultSupport =
  chrome: 22
  firefox: 15
  msie: 8
  opera: 12.12
  safari: 5

browserDialog = new Dialog
  warning: true

  content: '''
    <p>This site probably won't work until you update your browser.</p>
    <p>We recommend installing the latest <a href="http://www.mozilla.org/firefox/" target="_blank">Mozilla Firefox</a> or <a href="http://www.google.com/chrome" target="_blank">Google Chrome</a>.</p>
    <p>If you use <a href="http://www.microsoft.com/windows/internet-explorer/" target="_blank">Microsoft Internet Explorer</a>, make sure you're running the latest version.</p>
    <p>If you can't install the latest Internet Explorer, try <a href="http://google.com/chromeframe" target="_blank">Chrome Frame</a>!</p>
    <p class="action"><button name="close-dialog">Understood</button></p>
  '''

browserDialog.testAgent = (agent) ->
  matches =
    chrome: parseFloat agent.match(/Chrom\w+\W+([\w|\.]+)/i)?[1]
    firefox: parseFloat agent.match(/Firefox\W+([\w|\.]+)/i)?[1]
    msie: parseFloat agent.match(/MSIE\W+([\w|\.]+)/i)?[1]
    opera: parseFloat agent.match(/Opera.+Version\W+([\w|\.]+)/)?[1]
    safari: parseFloat agent.match(/Version\W+([\w|\.]+).+Safari/i)?[1]

  browser = (browser for browser in browserOrder when matches[browser])[0]
  version = matches[browser]

  {browser, version}

browserDialog.check = (customSupport = {}) ->
  support = $.extend {}, defaultSupport, customSupport
  {browser, version} = @testAgent navigator.userAgent

  return unless browser
  @show() if version < support[browser]

window.zooniverse.controllers.browserDialog = browserDialog
module?.exports = browserDialog
