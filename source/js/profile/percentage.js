export default class Percentage {
  constructor(percent, decimals) {
    this.percent = percent
    this.decimals = decimals || 2
  }

  get pretty() {
    return (this.percent * 100).toFixed(this.decimals) + '%'
  }
}
