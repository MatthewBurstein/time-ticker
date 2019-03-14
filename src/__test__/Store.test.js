const Store = require('../store')

describe("Store", () => {
  const store = new Store()

  describe("subscribe", () => {
    it("it adds the passed function to the repo", () => {
      const mock = jest.fn()
      store.subscribe(mock)
      expect(store.repo).toContain(mock)
    })
  })
})