export default class ProfileData {
  constructor(data) {
    this.data = {}
    for (var key in data) {
      if (!data.hasOwnProperty(key)) {
        continue
      }
      this.data[key] = new TimerSet(data[key])
    }
  }
}

class TimerSet {
  constructor(data) {
    this.data = data || {}
    this.timers = []

    for (const i in this.data.timers) {
      this.timers.push(new Timer(this.data.timers[i]))
    }
  }
}

class Timer {
  constructor(data) {
    this.data = data || {}
  }

  get end() {
    return this.data.end
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
}
