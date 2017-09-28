import Duration from './duration'
import Percentage from './percentage'

export default class ProfileData {
  constructor(data) {
    this.data = {}
    this.minStart = null
    this.maxEnd = null
    for (var key in data) {
      if (!data.hasOwnProperty(key)) {
        continue
      }
      const timerSet = new TimerSet(this, key, data[key])
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
  constructor(profileData, key, data) {
    this.key = key || null
    this.data = data || {}
    this.profileData = profileData
    this.timers = []

    for (const i in this.data.timers) {
      this.timers.push(new Timer(this, this.data.timers[i]))
    }
  }

  get average() {
    return new Duration(this.total.raw / this.count)
  }

  get count() {
    return this.timers.length
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

  get total() {
    let total = 0
    for (const i in this.timers) {
      total += this.timers[i].duration.raw
    }

    return new Duration(total)
  }

  get total_percent() {
    return new Percentage(this.total.raw / this.profileData.duration.raw)
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

  get total() {
    return this.duration
  }

  get total_percent() {
    return new Percentage(this.total.raw / this.timerSet.total.raw)
  }
}
