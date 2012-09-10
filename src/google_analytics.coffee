$ = require 'jqueryify'

googleAnalyticsSrc = 'http://www.google-analytics.com/ga.js'

if window.location.protocol is 'https:'
  googleAnalyticsSrc = googleAnalyticsSrc.replace 'http://www', 'https://ssl'

init = ({account, domain}, trackHashes = true) ->
  window._gaq ?= []
  window._gaq.push ['_setAccount', account]
  window._gaq.push ['_setDomainName', domain] if domain
  window._gaq.push ['_trackPageview']

  $(window).on 'hashchange', track if trackHashes

  $.getScript googleAnalyticsSrc

track = (location) =>
  location = null unless typeof location is 'string'
  window._gaq.push ['_trackPageview', location || window.location.href]

module.exports = {init, track}
