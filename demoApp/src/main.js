require('../public/main.scss')
require("../src/index.html")

import ticker from "../../src/index"
import {boardDimension} from './appConstants'
import { $squareFromCoords, createBoard, randomSquare } from './boardUtils'

window.ticker = ticker
ticker.setPeriod(500)

const DIRECTIONS = {
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

const FOOD_PROBABILITY = 0.2

const $ = require('jquery')

const state = {
  body: [{ x: 3, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }],
  direction: 'right',
  maxLength: 4
}


$('window').ready(() => {
  createBoard()

  $('.page-container').keydown(function(e) {
    state.direction = DIRECTIONS[e.keyCode]
  })

  const move = () => {
    state.body.unshift(nextHead())
    if (state.body.length > state.maxLength) { state.body.pop() }
  }

  const generateFood = () => {
    if (Math.random() > 1 - FOOD_PROBABILITY) {
      let inBody = true
      let square
      while (inBody) {
        square = randomSquare()
        inBody = state.body.find(bodySquare => bodySquare.x === square.x && bodySquare.y === square.y)
      }
      $squareFromCoords(square).toggleClass('food')
    }
  }

  const tick = () => {
    move()
    generateFood()
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

const nextHead = () => {
  let {x, y} = state.body[0]
  switch (state.direction) {
      case 'left':
      x = state.body[0].x === 0 ? boardDimension - 1 : state.body[0].x - 1
    break;
      case 'up':
      y = state.body[0].y === 0 ? boardDimension - 1 : state.body[0].y - 1
    break;
      case 'right':
      x = state.body[0].x === boardDimension - 1 ? 0 : state.body[0].x + 1
    break;
      case 'down':
      y = state.body[0].y === boardDimension - 1 ? 0 : state.body[0].y + 1
    break;
  }
  return {x, y}
}