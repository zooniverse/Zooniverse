$ = require 'jqueryify'

# new BarGraph
#   x: 'Month': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
#   y: 'Temp':  [10, 25, 33, 67, 75, 100]

class BarGraph
  x: null
  y: null

  floor: 0
  ceiling: NaN

  valueStyle: 'height' # Or "width", if you wanted a vertical bar chart for some reason.

  el: null
  className: 'bar-chart'

  items: null

  constructor: (params) ->
    @[property] = value for own property, value of params

    @el ?= $("<div class='#{@constructor::className}'></div>")
    @el = $(@el)
    @el.addClass @className

    @render()

  render: =>
    @el.empty()

    for yAxisLabel, yValues of @y
      max = @ceiling || Math.ceil Math.max yValues...

      @el.append """
        <div class="y axis">
          <div class="label">#{yAxisLabel}</div>
          <!--TODO: Y-axis Marks-->
        </div>
      """

    for xAxisLabel, xLabels of @x
      for label, i in xLabels
        @el.append """
          <div class="item" data-index="#{i}" data-value="#{yValues[i]}">
            <div class="bar" style="#{@valueStyle}: #{100 * ((yValues[i] - @floor) / (max - @floor))}%;"></div>
            <div class="label">#{yValues[i]} #{yAxisLabel}</div>
          </div>
        """

      @items = @el.find '.item'

      @el.append """
        <div class="x axis">
          <div class="label">#{xAxisLabel}</div>
          <!--TODO: Y-axis Marks-->
        </div>
      """

module.exports = BarGraph
