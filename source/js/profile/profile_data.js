import Duration from './duration'

export default class ProfileData {
  constructor(data) {
    this.data = {}
    this.minStart = null
    this.maxEnd = null
    for (var key in data) {
      if (!data.hasOwnProperty(key)) {
        continue
      }
      const timerSet = new TimerSet(key, data[key])
      this.data[key] = timerSet

      if (!this.minStart || timerSet.start < this.minStart) {
        this.minStart = timerSet.start
      }

      if (!this.maxEnd || timerSet.end > this.maxEnd) {
        this.maxEnd = timerSet.end
      }
    }
  }

  get duration() {
    return new Duration(this.maxEnd - this.minStart)
  }
}

class TimerSet {
  constructor(key, data) {
    this.key = key || null
    this.data = data || {}
    this.timers = []

    for (const i in this.data.timers) {
      this.timers.push(new Timer(this, this.data.timers[i]))
    }
  }

  get duration() {
    return new Duration(this.data.end - this.data.start)
  }

  get end() {
    return this.data.end
  }

  get endDate() {
    return new Date(this.data.end * 1000)
  }

  get start() {
    return this.data.start
  }

  get startDate() {
    return new Date(this.data.start * 1000)
  }

  timersByDuration() {
    let timers = []
    for (const i in this.timers) {
      timers.push(this.timers[i])
    }

    timers.sort(function(a, b) {
      const keyA = a.duration.raw
      const keyB = b.duration.raw
      if (keyA < keyB) return -1
      if (keyA > keyB) return 1
      return 0
    })

    return timers
  }
}

class Timer {
  constructor(timerSet, data) {
    this.timerSet = timerSet
    this.data = data || {}
  }

  get duration() {
    return new Duration(this.data.end - this.data.start)
  }

  get end() {
    return this.data.end
  }

  get endDate() {
    return new Date(this.data.end * 1000)
  }

  get key() {
    return this.data.key
  }

  get label() {
    return this.data.label
  }

  get meta() {
    return this.data.meta
  }

  get start() {
    return this.data.start
  }

  get startDate() {
    return new Date(this.data.start * 1000)
  }
}
