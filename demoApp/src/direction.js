export default class Direction {
  constructor() {
    this.dict = {
      // arrows
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
      // wasd
      65: 'left',
      87: 'up',
      68: 'right',
      83: 'down'
    }
    this.current = 'right'
  }

  setCurrent(keyCode) {
    this.current = this.dict[keyCode]
  }

  isValid(keyCode) {
    if (!this.dict.hasOwnProperty(keyCode)) { return false }

    if (this.current === 'left' && this.dict[keyCode] === 'right')  { return false }
    if (this.current === 'right' && this.dict[keyCode] === 'left')  { return false }
    if (this.current === 'up' && this.dict[keyCode] === 'down')  { return false }
    if (this.current === 'down' && this.dict[keyCode] === 'up')  { return false }

    return true
  }
}