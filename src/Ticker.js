const sleep = require('./utils/sleep')

class Ticker {
  constructor(store, period = null) {
    this.store = store
    this.running = false
    this.period = period
  }

  start() {
    this.running = true
    this.process = new Promise(async (res, rej) => {
      try {
        while(this.isRunning()) {
          this.store.callFunctions()
          await sleep(this.period)
        } 
      } catch (e) {
        rej(e)
      }
      res()
    })
    return this.process
  }
  
  stop() {
    this.running = false
    return this.process
  }
  
  isRunning() {
    return this.running
  }
  
  setPeriod(period) {
    this.period = period
  }
}

module.exports = Ticker;
