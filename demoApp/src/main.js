require('../public/main.scss')
require("../src/index.html")

import ticker from "../../src/index"

window.ticker = ticker
ticker.setPeriod(1000)

const DIRECTIONS = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
}
const BOARD_DIMENSION = 9

const $ = require('jquery')

const state = {
  body: [{x: 0, y: 0}],
  direction: ''
}


$('window').ready(() => {
  $('.page-container').keydown(function(e) {
    state.direction = DIRECTIONS[e.keyCode]
  })

  const move = () => {
    switch (state.direction) {
      case 'left':
      state.body[0].x = state.body[0].x === 0 ? BOARD_DIMENSION - 1 : state.body[0].x - 1
      break;
      case 'up':
      state.body[0].y = state.body[0].y === 0 ? BOARD_DIMENSION - 1 : state.body[0].y - 1
      break;
      case 'right':
      state.body[0].x = state.body[0].x === BOARD_DIMENSION - 1 ? 0 : state.body[0].x + 1
      break;
      case 'down':
      state.body[0].y = state.body[0].y === BOARD_DIMENSION - 1 ? 0 : state.body[0].y + 1
      break;
    }
  }

  const tick = () => {
    move()
    render()
  }

  const render = () => {
    const divIdx = state.body[0].y * BOARD_DIMENSION + state.body[0].x
    $('.head').removeClass('head')
    $(`.block-container :nth-child(${divIdx + 1})`).toggleClass('head')
  }

  ticker.add(tick)

  $('#start-button').on('click', () => {
    ticker.start()
  })
  $('#stop-button').on('click', () => {
    ticker.stop()
  })
})