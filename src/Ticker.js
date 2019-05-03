export default class Ticker {
  constructor(period = null) {
    this.store = []
    this.running = false
    this.period = period
    this.process = null
  }

  start() {
    this.running = true
    this._itterate()
  }

  stop() {
    this.running = false
    clearTimeout(this.process)
  }

  setPeriod(period) {
    this.period = period
  }

  add(...functions) {
    functions.forEach(fn => this.store.push(fn))
  }

  _itterate() {
    if (this.running) {
      this.store.forEach(fn => fn())
      this.process = setTimeout(() => this._itterate(), this.period)
    }
  }
}
