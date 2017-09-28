export default class TextContent {
  constructor(elContainer) {
    this.elContainer = elContainer
  }

  text(selector, value) {
    const el = this.elContainer.querySelector(selector)
    if (el) {
      el.innerText = value
    }
  }
}
