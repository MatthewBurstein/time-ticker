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
}

module.exports = Store;