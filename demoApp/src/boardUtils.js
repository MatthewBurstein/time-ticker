import boardDimension from './appConstants'

export const $squareFromCoords = ({ x, y }) => {
  const divIdx = y * boardDimension + x
  return $(`.board :nth-child(${divIdx + 1})`)
}

export const createBoard = () => {
  const $board = $('.board')
  const sqaure = '<div class="block"></div>'
  const arrayForItteration = Array.from({ length: boardDimension ** 2 })
  arrayForItteration.forEach(_ => $board.append(sqaure))
}

export const randomCoords = () => {
  const randomCoord = () => Math.floor(Math.random() * (boardDimension))
  return { x: randomCoord(), y: randomCoord() }
}

export const areCoordsInArray = (testCoords, arrayOfCoords) => arrayOfCoords.some(arrayCoords => {
  return arrayCoords.x === testCoords.x && arrayCoords.y === testCoords.y
})
