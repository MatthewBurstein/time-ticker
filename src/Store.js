class Store {
  constructor() {
    this.repo = {}
  }

  add(key, fn) {
    if (this.repo[key]) {
      this.repo[key].push(fn)
    } else {
      this.repo[key] = [fn]
    }
  }

  callFunctions(key) {
    this.store[key].forEach(fn => fn())
  }
}

module.exports = Store;