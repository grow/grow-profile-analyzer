import Duration from './duration'

export default class ProfileData {
  constructor(data) {
    this.data = {}
    for (var key in data) {
      if (!data.hasOwnProperty(key)) {
        continue
      }
      this.data[key] = new TimerSet(key, data[key])
    }
  }
}

class TimerSet {
  constructor(key, data) {
    this.key = key || null
    this.data = data || {}
    this.timers = []

    for (const i in this.data.timers) {
      this.timers.push(new Timer(this.data.timers[i]))
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
}

class Timer {
  constructor(data) {
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
