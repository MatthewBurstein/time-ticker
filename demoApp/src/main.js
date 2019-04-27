require('../public/main.scss')
require("../src/index.html")

import ticker from "../../src/index"
import { mod } from './utils';

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
  head: [0,0],
  direction: ''
}


$('window').ready(() => {
  $('.page-container').keydown(function(e) {
    state.direction = DIRECTIONS[e.keyCode]
  })

  const move = () => {
    switch (state.direction) {
      case 'left':
      state.head[1] = state.head[1] === 0 ? BOARD_DIMENSION - 1 : state.head[1] - 1
      break;
      case 'up':
      state.head[0] = state.head[0] === 0 ? BOARD_DIMENSION - 1 : state.head[0] - 1
      break;
      case 'right':
      state.head[1] = state.head[1] === BOARD_DIMENSION - 1 ? 0 : state.head[1] + 1
      break;
      case 'down':
      state.head[0] = state.head[0] === BOARD_DIMENSION - 1 ? 0 : state.head[0] + 1
      break;
    }
  }

  const tick = () => {
    move()
    render()
  }

  const render = () => {
    const divIdx = state.head[0] * BOARD_DIMENSION + state.head[1]
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