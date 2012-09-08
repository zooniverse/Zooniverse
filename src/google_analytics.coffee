$ = require 'jqueryify'

googleAnalyticsSrc = 'http://www.google-analytics.com/ga.js'

if window.location.protocol is 'https:'
  googleAnalyticsSrc = googleAnalyticsSrc.replace 'http://www', 'https://ssl'

getSrc = null

queue = null

init = ({account, domain}, noHashChange = false) ->
  getSrc = $.getScript googleAnalyticsSrc, ->
    queue = window._gaq ?= [
      ['_setAccount', account]
      ['_setDomainName', domain]
      ['_trackPageview']
    ]

    unless noHashChange
      $(window).on 'hashchange', => track window.location.href

    getSrc

track = (location) =>
  getSrc.done -> queue.push ['_trackPageview', location || window.location]

module.exports = {init, track}
