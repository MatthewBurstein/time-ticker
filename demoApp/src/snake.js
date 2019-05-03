import boardDimension from './appConstants'
import { areCoordsInArray } from './boardUtils'

export default class Snake {
  constructor() {
    this.coordinates = [{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }]
  }

  body() {
    return this.coordinates.slice(1)
  }

  head() {
    return this.coordinates[0]
  }

  contains(newCoords) {
    return areCoordsInArray(newCoords, this.coordinates)
  }

  move(direction) {
    this._add(this._getNextHead(direction))
    if (this._isTailPendingGrowthCoordinate()) {
      this._tail().isPendingGrowthCoordinate = false
    } else {
      this._popTail()
    }
  }

  consume(food) {
    this._setIsPendingGrowthCoordinate()
    food.remove(this.head())
  }

  isDead() {
    return areCoordsInArray(this.head(), this.body())
  }

  _isTailPendingGrowthCoordinate() {
    return !!this.coordinates[this.coordinates.length - 1].isPendingGrowthCoordinate
  }

  _tail() {
    return this.coordinates[this.coordinates.length - 1]
  }

  _setIsPendingGrowthCoordinate() {
    this.head().isPendingGrowthCoordinate = true
  }

  _add(newHead) {
    this.coordinates.unshift(newHead)
  }

  _popTail() {
    this.coordinates.pop()
  }

  _getNextHead(direction) {
    let { x, y } = this.head()
    switch (direction) {
      case 'left':
        x = this.head().x === 0 ? boardDimension - 1 : this.head().x - 1
        break
      case 'up':
        y = this.head().y === 0 ? boardDimension - 1 : this.head().y - 1
        break
      case 'right':
        x = this.head().x === boardDimension - 1 ? 0 : this.head().x + 1
        break
      case 'down':
        y = this.head().y === boardDimension - 1 ? 0 : this.head().y + 1
        break
      default:
    }
    return { x, y }
  }
}
