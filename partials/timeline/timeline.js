export default class TimelinePartial {
  constructor(config) {
    this.config = config || {}
    this.eventTarget = config.eventTarget || document
    this.eventTarget.addEventListener('data-loaded', this.onDataLoaded.bind(this))
    this.container = document.querySelector('.timeline')
  }

  onDataLoaded(e) {
    console.log('Timeline has data', e.detail)
  }
}
