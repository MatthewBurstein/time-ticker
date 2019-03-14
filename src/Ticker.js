class Ticker {
  constructor(store, period) {
    this.store = store
    this.period = period
  }

  tick(callImmediately = true) {
    const callFunctions = () => this.store.repo.forEach(fn => fn())
    const cycle = () => {
      setTimeout(() => {
        callFunctions()
        this.tick(false)
      }, this.period
    )}

    if (callImmediately) {callFunctions()}
    cycle()
  }
}

module.exports = Ticker;