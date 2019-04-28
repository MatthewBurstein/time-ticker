import { boardDimension } from './appConstants'

export default class Snake {
  constructor() {
    this.coordinates = [{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }]
    this.maxLength = 3
  }

  body() {
    return this.coordinates.slice(1)
  }

  head() {
    return this.coordinates[0]
  }

  contains(newCoords) {
    this.coordinates.some(bodyCoords => {
      return bodyCoords.x === newCoords.x && bodyCoords.y === newCoords.y
    })
  }

  move(direction) {
    this._add(this._getNextHead(direction))
    if (this._isComplete()) { this._popTail() }
  }

  consume(food) {
    this.maxLength += 1
    food.remove(this.head())
  }

  isDead() {
    return this.body().some(bodyCoords => {
      return bodyCoords.x === this.head().x && bodyCoords.y === this.head().y
    })
  }

  _add(newHead) {
    this.coordinates.unshift(newHead)
  }

  _isComplete() {
    return this._currentLength() > this.maxLength
  }

  _currentLength() {
    return this.coordinates.length
  }


  _popTail() {
    this.coordinates.pop()
  }

  _getNextHead(direction) {
    let {x, y} = this.head()
    switch (direction) {
      case 'left':
        x = this.head().x === 0 ? boardDimension - 1 : this.head().x - 1
        break;
      case 'up':
        y = this.head().y === 0 ? boardDimension - 1 : this.head().y - 1
        break;
      case 'right':
        x = this.head().x === boardDimension - 1 ? 0 : this.head().x + 1
        break;
      case 'down':
        y = this.head().y === boardDimension - 1 ? 0 : this.head().y + 1
        break;
    }
    return {x, y}
  }
}