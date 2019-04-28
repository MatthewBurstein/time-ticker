require('../public/main.scss')
require("../src/index.html")
const $ = require('jquery')

import ticker from "../../src/index"
import Snake from './snake'
import {boardDimension} from './appConstants'
import { $squareFromCoords, createBoard, randomCoords } from './boardUtils'

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

const snake = new Snake()

const FOOD_PROBABILITY = 0.2

const state = {
  direction: 'right',
  maxLength: 4
}


$('window').ready(() => {
  createBoard()

  $('.page-container').keydown(function(e) {
    state.direction = DIRECTIONS[e.keyCode]
  })

  const generateFood = () => {
    if (Math.random() > 1 - FOOD_PROBABILITY) {
      let inBody = true
      let coords
      while (inBody) {
        coords = randomCoords()
        inBody = snake.contains(coords)
      }
      $squareFromCoords(coords).toggleClass('food')
    }
  }

  const tick = () => {
    snake.move(state.direction)
    generateFood()
    render()
  }

  const render = () => {
    $('.head').removeClass('head')
    snake.coordinates.forEach(coords => $squareFromCoords(coords).addClass('head'))
  }

  ticker.add(tick)

  $('#start-button').on('click', () => {
    ticker.start()
  })
  $('#stop-button').on('click', () => {
    ticker.stop()
  })
})