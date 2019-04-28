require('../public/main.scss')
require("../src/index.html")
const $ = require('jquery')

import ticker from "../../src/index"
import Snake from './snake'
import Direction from './direction'
import Food from './food'
import { $squareFromCoords, createBoard, randomCoords } from './boardUtils'

window.ticker = ticker
ticker.setPeriod(500)

const direction = new Direction()
const snake = new Snake()
const food = new Food()

$('window').ready(() => {
  createBoard()

  $('.page-container').keydown(function(e) {
    if (direction.isValid(e.keyCode)) {
      direction.setCurrent(e.keyCode)
    }
  })

  const tick = () => {
    snake.move(direction.current)
    food.generate(snake.coordinates)
    render()
  }

  const render = () => {
    renderHead()
    renderFood()
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

const renderFood = () => {
  $('.food').removeClass('food')
  food.coordinates.forEach(coords => $squareFromCoords(coords).addClass('food'))
}