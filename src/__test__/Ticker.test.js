const Ticker = require("../Ticker.js")

jest.mock("../Store")

jest.useFakeTimers()

describe("Ticker", () => {
  const testPeriod = 100;
  const mockStore = require('../store');
  let storeFunc1, storeFunc2;
  let ticker


  beforeEach(() => {
    ticker = new Ticker(mockStore, testPeriod)
  })

  it("is intialized with a store and a period" , () => {
    expect(ticker.period).toEqual(100)
    expect(ticker.store).toEqual(mockStore)
  })

  it("is intialized with no timer" , () => {
    expect(ticker.timeout).toEqual(null)
  })

  describe("timer functiona", () => {
    beforeEach(() => {
      storeFunc1 = jest.fn(() => console.log("storeFunction1"))
      storeFunc2 = jest.fn()
      mockStore.repo = [storeFunc1, storeFunc2]
    })

    afterEach(() => {
      console.log('in aftereach')
        storeFunc1.mockReset()
        storeFunc2.mockReset()
    })

    describe("tick", () => {
      it("stores the timeout", () => {
        ticker.tick()
        expect(typeof ticker.timeout).toBe('number')
      })
  
      it("calls each function in the store once per period", () => {
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
  
    // describe("stop", () => {
    //   it("stops cycling", () => {
    //     mockStore.repo = [storeFunc1, storeFunc2]
  
    //     ticker.tick()
    //     jest.advanceTimersByTime(testPeriod)
    //     ticker.stop()
    //     jest.advanceTimersByTime(testPeriod)
    //     expect(storeFunc1).toHaveBeenCalledTimes(2)
    //     expect(storeFunc2).toHaveBeenCalledTimes(2)
    //   })
    // })
  })
})