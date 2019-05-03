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
  let turn = 0

  $('#start-button').on('click', () => {
    if(!started) {
      ticker.start()
      started = true
    }
  })

  $('#stop-button').on('click', () => {
    ticker.stop()
  })

  createBoard()

  $('.page-container').keydown(function(e) {
    if (direction.isValid(e.keyCode)) {
      direction.setCurrent(e.keyCode)
    }
  })

  const tick = () => {
    snake.move(direction.current)

    if(snake.isDead()) {
      ticker.stop()
      return alert('you lose')
    }

    if (food.contains(snake.head())) {
      snake.consume(food)
    }

    food.generate(snake.coordinates)
    renderer.render()
    turn += 1
    if (turn % 20 === 0 && ticker.period > 10) {
      ticker.setPeriod(Math.ceil(ticker.period * 0.9))
    }
  }

  ticker.add(tick)
})