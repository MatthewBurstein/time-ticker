require('../public/main.scss')
require("../src/index.html")
const $ = require('jquery')

import ticker from "../../src/index"
import Snake from './snake'
import Direction from './direction'
import Food from './food'
import Renderer from './renderer'
import { createBoard } from './boardUtils'

window.ticker = ticker
ticker.setPeriod(500)

const direction = new Direction()
const snake = new Snake()
const food = new Food()
const renderer = new Renderer(snake, food, direction)

$('window').ready(() => {
  let started = false;

  createBoard()

  $('.page-container').keydown(function(e) {
    if (direction.isValid(e.keyCode)) {
      direction.setCurrent(e.keyCode)
    }
  })

  const tick = () => {
    snake.move(direction.current)
    food.generate(snake.coordinates)
    renderer.render()
  }

  ticker.add(tick)

  $('#start-button').on('click', () => {
    if(!started) {
      ticker.start()
      started = true
    }
  })
  $('#stop-button').on('click', () => {
    ticker.stop()
  })
})