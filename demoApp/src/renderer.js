import { $squareFromCoords } from './boardUtils'

export default class Renderer {
  constructor(snake, food, direction) {
    this.snake = snake
    this.food = food
    this.direction = direction
  }

  render() {
    this._renderSnake()
    this._renderFood()
  }

  _renderSnake() {
    ['left', 'right', 'up', 'down'].forEach(dir => $(`.${dir}-arrow`).removeClass(`${dir}-arrow`))
    $squareFromCoords(this.snake.head()).addClass(`${this.direction.current}-arrow`)
    $('.body').removeClass('body')
    this.snake.body().forEach(coords => $squareFromCoords(coords).addClass('body'))
  }

  _renderFood() {
    $('.food').removeClass('food')
    this.food.coordinates.forEach(coords => $squareFromCoords(coords).addClass('food'))
  }
}