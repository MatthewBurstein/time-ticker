const sleep = require('./utils/sleep')

class Ticker {
  constructor(store) {
    this.store = store
    this.runners = {};
    Object.keys(store).forEach(key => this.runners[key] = { running: false, period: null });
  }

  async start(key) {
    this.runners[key].running = true
    while(this.isRunning(key)) {
      this.callfunctions(key)
      await sleep(this.runners[key].period)
    }
  }

  stop(key) {
    this.runners[key].running = false
  }

  isRunning(key) {
    return this.runners[key].running
  }

  callFunctions(key) {
    this.store[key].forEach(fn => fn())
  }
}

module.exports = Ticker;