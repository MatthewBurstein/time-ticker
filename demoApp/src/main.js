require('../public/main.scss')
require("../src/index.html")
const $ = require('jquery')

import ticker from "../../src/index"
import Snake from './snake'
import Direction from './direction'
import { $squareFromCoords, createBoard, randomCoords } from './boardUtils'

window.ticker = ticker
ticker.setPeriod(500)

const direction = new Direction()

const snake = new Snake()

const FOOD_PROBABILITY = 0.2

$('window').ready(() => {
  createBoard()

  $('.page-container').keydown(function(e) {
    if (direction.isValid(e.keyCode)) {
      direction.setCurrent(e.keyCode)
    }
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
    snake.move(direction.current)
    generateFood()
    render()
  }

  const render = () => {
    renderHead()
    $('.body').removeClass('body')
    snake.body().forEach(coords => $squareFromCoords(coords).addClass('body'))
  }

  ticker.add(tick)

  $('#start-button').on('click', () => {
    ticker.start()
  })
  $('#stop-button').on('click', () => {
    ticker.stop()
  })
})

const renderHead = () => {
  ['left', 'right', 'up', 'down'].forEach(dir => $(`.${dir}-arrow`).removeClass(`${dir}-arrow`))
  $squareFromCoords(snake.head()).addClass(`${direction.current}-arrow`)
}