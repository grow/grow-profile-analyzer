import I18n from '../../source/js/common/i18n'
import TextContent from '../../source/js/common/textContent'

export default class TopPartial {
  constructor(config) {
    this.config = config || {}
    this.i18n = new I18n()
    this.eventTarget = config.eventTarget || document
    this.eventTarget.addEventListener('data-loaded', this.onDataLoaded.bind(this))
    this.elContainer = document.querySelector('.top')
    this.elItems = this.elContainer.querySelector('.top__timersets')
    this.temTimerSet = this.elContainer.querySelector('#top-template-timerset')
    this.temTimer = this.elContainer.querySelector('#top-template-timer')
  }

  addTimer(timer, elList) {
    const currentTimer = document.importNode(this.temTimer.content, true)
    const container = new TextContent(currentTimer)

    container.text('.top__timer__label', timer.label)
    container.text('.top__timer__duration', timer.duration.pretty)
    container.text('.top__timer__percent', timer.total_percent.pretty)

    elList.appendChild(currentTimer)
  }

  addTimerSet(timerSet) {
    const currentTimerSet = document.importNode(this.temTimerSet.content, true)
    const container = new TextContent(currentTimerSet)

    // Set the timer set information
    container.text('h2', timerSet.key)
    container.text('.top__timerset__total', timerSet.total.pretty)
    container.text('.top__timerset__count', timerSet.count)
    container.text('.top__timerset__count__unit', this.i18n.ngettext(
      'instance', 'instances', timerSet.count))
    container.text('.top__timerset__total__percentage', timerSet.total_percent.pretty)

    if (timerSet.timers.length > 1) {
      container.text('.top__timerset__average', timerSet.average.pretty)
      const elFastest = currentTimerSet.querySelector('.top__fast .top__list')
      const elSlowest = currentTimerSet.querySelector('.top__slow .top__list')
      const sortedTimers = timerSet.timersByDuration()
      const slowest = sortedTimers.slice(-5).reverse()
      const fastest = sortedTimers.slice(0, 5)

      // Add the slowest timers.
      for (const i in slowest) {
        this.addTimer(slowest[i], elSlowest)
      }

      // Add the fastest timers.
      for (const i in fastest) {
        this.addTimer(fastest[i], elFastest)
      }
    } else {
      const elMulti = currentTimerSet.querySelector('.top__multi')
      elMulti.remove()
    }

    this.elItems.appendChild(currentTimerSet)
  }

  clearItems() {
    while (this.elItems.firstChild) {
      this.elItems.removeChild(this.elItems.firstChild)
    }
  }

  onDataLoaded(e) {
    this.clearItems()
    const data = e.detail.data

    let keys = []
    for (var key in data) {
      if (!data.hasOwnProperty(key)) {
        continue
      }
      keys.push(key)
    }

    keys.sort()

    for (var i in keys) {
      this.addTimerSet(data[keys[i]])
    }

    this.elContainer.classList.add('top--active')
  }
}
