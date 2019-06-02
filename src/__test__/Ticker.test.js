import Ticker from '../Ticker'

jest.useFakeTimers()

describe('Ticker', () => {
  const testPeriod = 5
  let ticker
  let mockFunc1
  let mockFunc2

  beforeEach(() => {
    ticker = new Ticker(testPeriod)
    mockFunc1 = jest.fn()
    mockFunc2 = jest.fn()
    ticker.add(mockFunc1, mockFunc2)
  })
  describe('setPeriod', () => {
    it('sets the period', () => {
      const newPeriod = 20
      ticker.setPeriod(newPeriod)
      expect(ticker.period).toEqual(newPeriod)
    })
  })

  describe('#start', () => {
    afterEach(() => {
      mockFunc1.mockReset()
      mockFunc2.mockReset()
      ticker.stop()
    })

    it('calls each function once immediately', () => {
      expect.assertions(2)

      ticker.start()

      expect(mockFunc1).toHaveBeenCalledTimes(1)
      expect(mockFunc2).toHaveBeenCalledTimes(1)
    })

    it('has called each function twice after one period', () => {
      expect.assertions(2)

      ticker.start()
      jest.advanceTimersByTime(testPeriod)

      expect(mockFunc1).toHaveBeenCalledTimes(2)
      expect(mockFunc2).toHaveBeenCalledTimes(2)
    })

    it('has called each function three times after two periods', () => {
      expect.assertions(2)

      ticker.start()
      jest.advanceTimersByTime(testPeriod)
      jest.advanceTimersByTime(testPeriod)

      expect(mockFunc1).toHaveBeenCalledTimes(3)
      expect(mockFunc2).toHaveBeenCalledTimes(3)
    })
  })

  describe('#stop', () => {
    it('stops timer', () => {
      expect.assertions(2)

      ticker.start()
      jest.advanceTimersByTime(testPeriod)
      ticker.stop()
      jest.advanceTimersByTime(testPeriod)

      expect(mockFunc1).toHaveBeenCalledTimes(2)
      expect(mockFunc2).toHaveBeenCalledTimes(2)
    })
  })
})
