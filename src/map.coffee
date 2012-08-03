$ = require 'jqueryify'

# Make sure "node_modules/Zooniverse/vendor/leaflet/leaflet.js" is in "libs" in your slug.json.
# Also, you'll need this CSS: "http://cdn.leafletjs.com/leaflet-0.4.2/leaflet.css".
Leaflet = window.L

class Map
  # Defaults only. Don't count on these to be accurate later.
  latitude: 41.9
  longitude: -87.6
  zoom: 10

  layers: null # Default layers (from CartoDB, etc.)

  zoomControl: true
  scrollWheelZoom: false
  doubleClickZoom: false

  # Set these before use.
  # It's probably okay to modify the prototype directly per project.
  # I.e. Map::apiKey = '1234567890'
  apiKey: '' # CloudMade API key
  tilesId: 998 # CloudMade style ID

  map: null

  constructor: (params = {}) ->
    @[param] = value for own param, value of params
    throw new Error 'Map class needs an apiKey!' unless @apiKey

    @el ?= $('<div></div>')

    @layers ?= []
    @layers = [@layers] unless @layers instanceof Array

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

    @el.css position: '' # Don't let Leaflet override this.

  setCenter: (latitude, longitude) =>
    @map.setView new Leaflet.LatLng(latitude, longitude), @map.getZoom()

  setZoom: (zoom) =>
    @map.setZoom zoom

  addLayer: (url) =>
    layer = new Leaflet.TileLayer url
    @map.addLayer layer
    layer

  removeLayer: (layer) =>
    @map.removeLayer layer

  addLabel: (lat, lng, content, options = {}) =>
    icon = new Leaflet.DivIcon className: options.className || 'map-label'
    marker = new Leaflet.Marker [lat, lng], {icon}
    marker.addTo @map

    # This is a bit of a hack.
    iconElement = $(marker._icon)
    iconElement.css height: '', marginLeft: '', marginTop: '', width: ''
    iconElement.append content
    marker

  removeLabel: (label) =>
    @map.removeLayer label

  resize: =>
    @map.invalidateSize()

module.exports = Map
