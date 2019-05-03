import {boardDimension} from './appConstants'

export const $squareFromCoords = ({x, y}) => {
  const divIdx = y * boardDimension + x
  return $(`.board :nth-child(${divIdx + 1})`)
}

export const createBoard = () => {
  const $board = $('.board')
  const arrayForItteration = Array.from({length: boardDimension ** 2})
  const squareDiv = '<div class="block"></div>'
  arrayForItteration.forEach(_ => $board.append(squareDiv))
}

export const randomCoords = () => {
  const randomCoord = () => Math.floor(Math.random() * (boardDimension));
  return { x: randomCoord(), y: randomCoord() }
}