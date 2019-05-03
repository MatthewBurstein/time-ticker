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
      83: 'down',
    }
    this.current = 'right'
  }

  confirmPendingFromCurrent() {
    if (this.pending && this._isPendingValidDirection()) {
      this.current = this.pending
    }
  }

  setPending(keyCode) {
    if (this._isValidKey(keyCode)) {
      this.pending = this.dict[keyCode]
    }
  }

  _isValidKey(keyCode) {
    return !!this.dict[keyCode]
  }

  _isPendingValidDirection() {
    if (this.current === 'left' && this.pending === 'right') { return false }
    if (this.current === 'right' && this.pending === 'left') { return false }
    if (this.current === 'up' && this.pending === 'down') { return false }
    if (this.current === 'down' && this.pending === 'up') { return false }

    return true
  }
}
