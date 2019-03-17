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
          console.log("start of itteration")
          this.store.callFunctions()
          await sleep(this.period)
          console.log("end of itteration/after sleep")
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
