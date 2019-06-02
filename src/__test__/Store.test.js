import Store from '../Store'

describe('Store', () => {
  let store

  beforeEach(() => {
    store = new Store()
  })

  describe('add', () => {
    describe('when the key does not already exist in the repo', () => {
      it('adds the key to the repo and stores the passed function', () => {
        const mockFn = jest.fn()

        store.add(mockFn)

        expect(store.repo).toEqual([mockFn])
      })
    })

    describe('when the key already exists in the repo', () => {
      it('it adds the passed function to the repo', () => {
        const firstMockFn = jest.fn()
        const secondMockFn = jest.fn()
        store.add(firstMockFn)
        store.add(secondMockFn)

        expect(store.repo).toEqual([firstMockFn, secondMockFn])
      })
    })
  })
})
