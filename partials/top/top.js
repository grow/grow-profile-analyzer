export default class TopPartial {
  constructor(config) {
    this.config = config || {}
    this.eventTarget = config.eventTarget || document
    this.eventTarget.addEventListener('data-loaded', this.onDataLoaded.bind(this))
    this.container = document.querySelector('.top')
  }

  onDataLoaded(e) {
    console.log('Top has data', e.detail)
  }
}
