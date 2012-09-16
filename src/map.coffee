$ = require 'jqueryify'

# NOTE: You'll need this CSS: "http://cdn.leafletjs.com/leaflet-0.4.2/leaflet.css".

Leaflet = try
  require 'zooniverse/vendor/leaflet/leaflet-src'
catch e
  console.warn 'You should use Leaflet as a CommonJS module.'
  window.L

class Map
  # Defaults only. Don't count on these to be accurate later.
  latitude: 41.9
  longitude: -87.6
  centerOffset: null # [x, y] out of 1, relative to the element (not [lat, lng])
  zoom: 10

  className: ''

  layers: null # Default layers (from CartoDB, etc.)

  zoomControl: true
  scrollWheelZoom: false
  doubleClickZoom: false

  labels: null

  # Set these before use.
  # It's probably okay to modify the prototype directly per project.
  # I.e. Map::apiKey = '1234567890'
  apiKey: '' # CloudMade API key
  tilesId: 998 # CloudMade style ID

  map: null

  constructor: (params = {}) ->
    @[param] = value for own param, value of params
    throw new Error 'Map class needs an apiKey!' unless @apiKey

    @centerOffset ?= [0.5, 0.5]

    @el ?= $('<div class="map"></div>')
    @el.addClass @className if @className

    @layers ?= []
    @layers = [@layers] unless @layers instanceof Array

    @labels ?= []

    @map ?= new Leaflet.Map @el.get(0),
      center: new Leaflet.LatLng @latitude, @longitude
      zoom: @zoom
      layers: [
        new Leaflet.TileLayer "http://{s}.tile.cloudmade.com/#{@apiKey}/#{@tilesId}/256/{z}/{x}/{y}.png"
        (new Leaflet.TileLayer url for url in @layers)...
      ]
      scrollWheelZoom: @scrollWheelZoom
      doubleClickZoom: @doubleClickZoom
      attributionControl: false
      zoomControl: @zoomControl
      worldCopyJump: false

    @el.css position: '' # Don't let Leaflet override this.

    @setCenter @latitude, @longitude # Recenter in case there's a center offset.

    $(window).on 'hashchange', =>
      {x, y} = @map.getSize()
      setTimeout @resize if 0 in [x, y]

    setTimeout @resize

  setCenter: (lat, lng) =>
    bounds = @map.getBounds()
    ne = bounds.getNorthEast()
    sw = bounds.getSouthWest()

    shift =
      lat: (ne.lat - sw.lat) * -(0.5 - @centerOffset[1])
      lng: (ne.lng - sw.lng) * +(0.5 - @centerOffset[0])

    @map.setView new Leaflet.LatLng(lat + shift.lat, lng + shift.lng, true), @map.getZoom()

  setZoom: (zoom) =>
    @map.setZoom zoom

  addLayer: (url) =>
    layer = new Leaflet.TileLayer url
    @map.addLayer layer
    layer

  removeLayer: (layer) =>
    @map.removeLayer layer

  addLabel: (lat, lng, html, radius = 5) =>
    latLng = new Leaflet.LatLng lat, lng, true
    label = new Leaflet.CircleMarker(latLng, {radius}).addTo @map
    @labels.push label
    label.bindPopup html if html
    label

  removeLabel: (label) =>
    @map.removeLayer label

  resize: =>
    @map.invalidateSize()

module.exports = Map
