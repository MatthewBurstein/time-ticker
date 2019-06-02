import { randomCoords, areCoordsInArray } from './boardUtils'


export default class Food {
  constructor() {
    this.coordinates = []
    this.probability = 0.2
  }

  generate(occupied) {
    if (Math.random() < this.probability) {
      let excluded = true
      const excludedCoords = [...occupied, ...this.coordinates]
      let coords
      while (excluded) {
        coords = randomCoords()
        excluded = areCoordsInArray(coords, excludedCoords)
      }
      this.coordinates.push(coords)
    }
  }

  contains(testCoords) {
    return areCoordsInArray(testCoords, this.coordinates)
  }

  remove(removeCoords) {
    const idx = this.coordinates.findIndex(foodCoords => foodCoords.x === removeCoords.x && foodCoords.y === removeCoords.y)
    this.coordinates.splice(idx, 1)
  }
}
