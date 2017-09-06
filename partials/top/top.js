export default class TopPartial {
  constructor(config) {
    this.config = config || {}
    this.eventTarget = config.eventTarget || document
    this.eventTarget.addEventListener('data-loaded', this.onDataLoaded.bind(this))
    this.elContainer = document.querySelector('.top')
    this.elItems = this.elContainer.querySelector('.top__timersets')
    this.temTimerSet = this.elContainer.querySelector('#top-template-timerset')
    this.temTimer = this.elContainer.querySelector('#top-template-timer')
  }

  addTimer(timer, elList) {
    const currentTimer = document.importNode(this.temTimer.content, true)

    const elTimerHeader = currentTimer.querySelector('.top__timer__label')
    elTimerHeader.innerText = timer.label
    const elTimerDuration = currentTimer.querySelector('.top__timer__duration')
    elTimerDuration.innerText = timer.duration.pretty
    const elTimerPercent = currentTimer.querySelector('.top__timer__percent')
    elTimerPercent.innerText = (
      timer.duration.raw / timer.timerSet.duration.raw * 100).toFixed(3)

    elList.appendChild(currentTimer)
  }

  addTimerSet(timerSet) {
    const currentTimerSet = document.importNode(this.temTimerSet.content, true)

    // Set the timer set information
    const elHeader = currentTimerSet.querySelector('h2')
    elHeader.innerText = timerSet.key
    const elDuration = currentTimerSet.querySelector('.top__timerset__duration')
    elDuration.innerText = timerSet.duration.pretty

    if (timerSet.timers.length > 1) {
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
      const elSplit = currentTimerSet.querySelector('.top__split')
      elSplit.parentNode.removeChild(elSplit)
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
