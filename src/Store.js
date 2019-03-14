class Store {
  constructor() {
    this.repo = []
  }

  subscribe(fn) {
    this.repo.push(fn)
  }
}

module.exports = Store;