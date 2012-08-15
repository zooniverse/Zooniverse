$ = require 'jqueryify'

# new BarGraph
#   x: 'Month': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
#   y: 'Temp':  [10, 25, 33, 67, 75, 100]

class BarGraph
  x: null
  y: null

  valueStyle: 'height' # Or "width", if you wanted a vertical bar chart for some reason.

  el: null
  className: 'bar-chart'

  constructor: (params) ->
    @[property] = value for own property, value of params

    @el ?= $('<div></div>')
    @el = $(@el)
    @el.addClass @constructor::className
    @el.addClass @className

    @render()

  render: =>
    @el.empty()

    for yAxisLabel, yValues of @y
      max = Math.ceil Math.max yValues...
      @el.append """
        <div class="y axis">
          <div class="label">#{yAxisLabel}</div>
          <!--TODO: Y-axis Marks-->
        </div>
      """

    for xAxisLabel, xLabels of @x
      @el.append """
        <div class="x axis">
          <div class="label">#{xAxisLabel}</div>
          <!--TODO: Y-axis Marks-->
        </div>
      """

      for label, i in xLabels
        console.log yValues[i], max
        @el.append """
          <div class="item" data-index="#{i}" data-value="#{yValues[i]}">
            <div class="bar" style="#{@valueStyle}: #{100 * (yValues[i] / max)}%;"></div>
            <div class="label">#{label}</div>
          </div>
        """

module.exports = BarGraph
