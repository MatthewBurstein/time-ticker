class Store {
  constructor() {
    this.repo = []
  }

  add(fn) {
    this.repo.push(fn)
  }

  callFunctions() {
    this.repo.forEach(fn => fn())
  }
}

export default Store
