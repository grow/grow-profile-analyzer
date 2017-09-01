export default class Timeline {
  constructor(config) {
    this.config = config || {}
    this.eventTarget = config.eventTarget || document
    this.eventTarget.addEventListener('data-loaded', this.onDataLoaded.bind(this))
  }

  onDataLoaded(e) {
    console.log(e.detail)
  }
}
