import Defer from '../../source/js/common/defer'

export default class TimelinePartial {
  constructor(config) {
    this.config = config || {}
    this.eventTarget = config.eventTarget || document
    this.eventTarget.addEventListener(
      'data-loaded', this.onDataLoaded.bind(this))
    this.elContainer = document.querySelector('.timeline')
    this.elChart = null
    this.temTimelineChart = this.elContainer.querySelector('#timeline-template-chart')

    // Load the timeline chart.
    google.charts.load('current', {
      packages: ['timeline']
    })
    this.deferChart = new Defer()
    google.charts.setOnLoadCallback(this.onChartLoaded.bind(this))
  }

  onDataLoaded(e) {
    const data = e.detail.data
    this.deferChart.promise.then(() => {
      if (!this.elChart) {
        const chartContainer = document.importNode(this.temTimelineChart.content, true)
        this.elChart = chartContainer.querySelector('.timeline__chart')
        this.elContainer.appendChild(chartContainer)
      }
      let chart = new google.visualization.Timeline(this.elChart)
      let dataTable = new google.visualization.DataTable()

      dataTable.addColumn({
        type: 'string',
        id: 'Key'
      })
      dataTable.addColumn({
        type: 'string',
        id: 'Label'
      });
      dataTable.addColumn({
        type: 'date',
        id: 'Start'
      })
      dataTable.addColumn({
        type: 'date',
        id: 'End'
      })
      const rows = []
      for (const key in data) {
        if (!data.hasOwnProperty(key)) {
          continue
        }
        const timerSet = data[key]
        const timers = timerSet.timers
        for (const i in timers) {
          const timer = timers[i]
          rows.push([timer.key, timer.label, timer.startDate, timer.endDate])
        }
      }
      dataTable.addRows(rows)
      chart.draw(dataTable, {
        avoidOverlappingGridLines: false,
      })
    })
  }

  onChartLoaded(e) {
    this.deferChart.resolve()
  }
}
