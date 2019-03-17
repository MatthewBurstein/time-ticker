const Ticker = require("../Ticker")
const sleep = require('../utils/sleep')

jest.mock("../Store")

jest.useFakeTimers()

describe("Ticker", () => {
  const testPeriod = 5;
  const mockStore = {repo: {}}
  let ticker;

  beforeEach(() => {
    ticker = new Ticker(mockStore)
  })

  it("is intialized with a store and a period" , () => {
    expect(ticker.store).toEqual(mockStore)
  })

  describe("setPeriod", () => {
    it("sets the period", () => {
      ticker.setPeriod(testPeriod)
      expect(ticker.period).toEqual(testPeriod)
    })
  })

  describe("start and stop functions", () => {
    beforeEach(() => {
      mockStore.callFunctions = jest.fn()
      ticker.setPeriod(testPeriod)
    })
    
    afterEach(() => {
      mockStore.callFunctions.mockReset()
      ticker.stop()
    })
      
    it("calls each function once immediately", done => {      
      expect.assertions(1)

      ticker.start()
      
      expect(mockStore.callFunctions).toHaveBeenCalledTimes(1)
      done()
    })

    it("has called each function twice after one period", () => {
      expect.assertions(1)

      ticker.start()
      jest.advanceTimersByTime(testPeriod)

      return ticker.stop().then(() => {
        expect(mockStore.callFunctions).toHaveBeenCalledTimes(2)
      })
    })
    
    it("has called each function three times after two periods", () => {
      expect.assertions(1)

      ticker.start()
      jest.advanceTimersByTime(testPeriod)
      jest.advanceTimersByTime(testPeriod)

      return ticker.stop().then(() => {
        expect(mockStore.callFunctions).toHaveBeenCalledTimes(3)
      })
    })   
  })
})