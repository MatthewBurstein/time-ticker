const Store = require('../store')

describe("Store", () => {
  let store
  
  beforeEach(() => {
    store = new Store()
  })

  describe("subscribe", () => {
    describe("when the key does not already exist in the repo", () => {
      it("adds the key to the repo and stores the passed function", () => {
        const mockFn = jest.fn()
        const testKey = "testKey"

        store.subscribe(testKey, mockFn)
        
        expect(store.repo[testKey]).toEqual([mockFn])
      })
    })

    describe("when the key already exists in the repo", () => {
      it("it adds the passed function to the repo", () => {
        const previousMockFn = jest.fn()
        const mockFn = jest.fn()
        const testKey = "testKey"
        store.repo[testKey] = [previousMockFn]

        store.subscribe(testKey, mockFn)
  
        expect(store.repo[testKey]).toEqual([previousMockFn, mockFn])
      })
    })
  })
})