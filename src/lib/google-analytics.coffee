window.zooniverse ?= {}

EventEmitter = window.zooniverse.EventEmitter || require './event-emitter'
$ = window.jQuery

GA_SCOPES = visitor: 1, session: 2, page: 3

gaSrc = 'http://www.google-analytics.com/ga.js'
gaSrc = gaSrc.replace 'http://www', 'https://ssl' if window.location.protocol is 'https:'

class GoogleAnalytics extends EventEmitter
  @current: null

  account: ''
  domain: ''
  trackHashes: true

  constructor: (params = {}) ->
    @[property] = value for property, value of params
    @select()

    $.getScript gaSrc unless window._gaq

    window._gaq ?= []
    window._gaq.push ['_setAccount', @account]
    window._gaq.push ['_setDomainName', @domain] if @domain
    window._gaq.push ['_trackPageview']

    $(window).on 'hashchange', (=> @track()) if @trackHashes

  select: ->
    @constructor.current = @
    @trigger 'select'

  track: (pathname) ->
    pathname = "/#{location.hash}" unless typeof pathname is 'string'
    window._gaq.push ['_trackPageview', pathname]
    @trigger 'track', [pathname]

  event: (category, action, label, value, ignoreForBounceRate) ->
    window._gaq.push(['_trackEvent', arguments...]);
    @trigger 'event', [arguments...]

  custom: (index, key, value, scope) ->
    index = @constructor.indices[index] if typeof index is 'string'
    scope = GA_SCOPES[scope] if typeof scope is 'string'

    command = ['_setCustomVar', index, key, value]
    command.push scope if scope?

    window._gaq.push command
    @trigger 'custom', [arguments...]

window.zooniverse?.GoogleAnalytics = GoogleAnalytics
module?.exports = GoogleAnalytics
