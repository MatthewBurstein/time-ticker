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
  body: [{ x: 3, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }],
  direction: '',
  maxLength: 4
}


$('window').ready(() => {
  $('.page-container').keydown(function(e) {
    state.direction = DIRECTIONS[e.keyCode]
  })

  const move = () => {
    state.body.unshift(nextHead())
    if (state.body.length > state.maxLength) { state.body.pop() }
  }

  const tick = () => {
    move()
    render()
  }

  const render = () => {
    $('.head').removeClass('head')
    state.body.forEach(coords => $squareFromCoords(coords).addClass('head'))
  }

  ticker.add(tick)

  $('#start-button').on('click', () => {
    ticker.start()
  })
  $('#stop-button').on('click', () => {
    ticker.stop()
  })
})

const $squareFromCoords = ({x, y}) => {
  const divIdx = y * BOARD_DIMENSION + x
  return $(`.block-container :nth-child(${divIdx + 1})`)
}

const nextHead = () => {
  let {x, y} = state.body[0]
  switch (state.direction) {
      case 'left':
      x = state.body[0].x === 0 ? BOARD_DIMENSION - 1 : state.body[0].x - 1
    break;
      case 'up':
      y = state.body[0].y === 0 ? BOARD_DIMENSION - 1 : state.body[0].y - 1
    break;
      case 'right':
      x = state.body[0].x === BOARD_DIMENSION - 1 ? 0 : state.body[0].x + 1
    break;
      case 'down':
      y = state.body[0].y === BOARD_DIMENSION - 1 ? 0 : state.body[0].y + 1
    break;
  }
  return {x, y}
}