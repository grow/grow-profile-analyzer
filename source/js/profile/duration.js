export default class Duration {
  constructor(seconds) {
    this.raw = seconds
    let remainder = seconds
    this.s = Math.floor(seconds)
    remainder = remainder - this.s
    this.ms = Math.floor(remainder * 1000)
    remainder = remainder - this.ms / 1000
    this.mics = Math.floor(remainder * 1000000)
  }

  get pretty() {
    if (this.s > 0) {
      return this.s + '.' + this.zeroFill(this.ms) + ' s'
    } else if (this.ms > 0) {
      return this.ms + '.' + this.zeroFill(this.mics) + ' ms'
    } else {
      return this.mics + ' µs'
    }
  }

  zeroFill(n) {
    return ('000' + n).slice(-3)
  }
}
