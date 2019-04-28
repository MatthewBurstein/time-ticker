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
        })
      }
      this.coordinates.push(coords)
    }
  }
}