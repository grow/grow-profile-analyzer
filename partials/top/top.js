export default class TopPartial {
  constructor(config) {
    this.config = config || {}
    this.eventTarget = config.eventTarget || document
    this.eventTarget.addEventListener('data-loaded', this.onDataLoaded.bind(this))
    this.elContainer = document.querySelector('.top')
    this.elItems = this.elContainer.querySelector('.top__items')
    this.temItem = this.elContainer.querySelector('#top-template-item')
  }

  addItem(timerSet) {
    const currentItem = document.importNode(this.temItem.content, true)

    const header = currentItem.querySelector('h2')
    header.innerText = timerSet.key
    const duration = currentItem.querySelector('.top__item__duration')
    duration.innerText = timerSet.duration.pretty

    this.elItems.appendChild(currentItem)
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
      this.addItem(data[keys[i]])
    }
  }
}
