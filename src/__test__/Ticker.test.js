const Ticker = require("../Ticker.js")

jest.mock("../Store")

jest.useFakeTimers()

describe("Ticker", () => {
  const testPeriod = 100
  const mockStore = require('../Store')
  const ticker = new Ticker(mockStore, testPeriod)

  it("is created with a store and a period" , () => {
    expect(ticker.period).toEqual(100)
    expect(ticker.store).toEqual(mockStore)
  })

  describe("tick", () => {
    it("calls each function in the store once per period", () => {
      const storeFunc1 = jest.fn()
      const storeFunc2 = jest.fn()
      mockStore.repo = [storeFunc1, storeFunc2]

      ticker.tick()
      expect(storeFunc1).toHaveBeenCalledTimes(1)
      expect(storeFunc2).toHaveBeenCalledTimes(1)

      jest.advanceTimersByTime(testPeriod)

      expect(storeFunc1).toHaveBeenCalledTimes(2)
      expect(storeFunc2).toHaveBeenCalledTimes(2)

      jest.advanceTimersByTime(testPeriod)
      
      expect(storeFunc1).toHaveBeenCalledTimes(3)
      expect(storeFunc2).toHaveBeenCalledTimes(3)
    })
  })
})