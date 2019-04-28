import { randomCoords } from './boardUtils'

export default class Food {
  constructor() {
    this.coordinates = []
    this.probability = 0.2
  }

  generate(occupied) {
    if (Math.random() < this.probability) {
      let excluded = true
      let coords
      while (excluded) {
        coords = randomCoords()
        excluded = [...occupied, ...this.coordinates].find(excludedCoords => {
          return excludedCoords.x === coords.x && excludedCoords.y === coords.y
        }) !== undefined
      }
      this.coordinates.push(coords)
    }
  }

  contains(testCoords) {
    return this.coordinates.find(foodCoords => {
      return foodCoords.x === testCoords.x && foodCoords.y === testCoords.y
    }) !== undefined
  }

  remove(removeCoords) {
    const idx = this.coordinates.findIndex(foodCoords => {
      return foodCoords.x === removeCoords.x && foodCoords.y === removeCoords.y
    })
    this.coordinates.splice(idx, 1)
  }
}