import letters from '../constants/letters';
import {toXY} from '../constants/matrix';
import {toChess} from '../constants/toChessNotation';
//TODO make this handle color
//TODO refactor this to be more concise...
export function possibleRookMoves(src, board, piece){
  const opposingColor = piece.charAt(0) === "w"? "b":"w"
  const availableSquares = {
    selectedPiece: piece,
    selectedPieceSrc: src,
    captures: [],
    availables: []
  }
  let coords = toXY(src)
  let x = coords[0] // 7
  let y = coords[1] // 2
  //left Side
  let ixl = x-1;
  while (ixl >= 0){
    let squareContains = board[src.charAt(0)][ixl]
    if (squareContains == "e"){
      availableSquares.availables.push(toChess([ixl, y]))
    } else if(squareContains.charAt(0) === opposingColor) {
      availableSquares.captures.push(toChess([ixl, y]))
      break;
    } else {
      break;
    }
    ixl--;
  }
  let ixr = x+1
  //right side
  while (ixr <= 7){
    let squareContains = board[src.charAt(0)][ixr]
    if (squareContains == "e"){
      availableSquares.availables.push(toChess([ixr, y]))
    } else if(squareContains.charAt(0) === opposingColor) {
      availableSquares.captures.push(toChess([ixr, y]))
      break;
    } else {
      break;
    }
     ixr++;
  }

  //up
  let yup = y+1
  while (yup <= 7){
    let squareContains = board[toChess([x,yup])[0]][x]
    if (squareContains == "e"){
      availableSquares.availables.push(toChess([x, yup]))
    } else if(squareContains.charAt(0) === opposingColor) {
      availableSquares.captures.push(toChess([x, yup]))
      break;
    } else {
      break;
    }
     yup++;
  }
  //down
  let ydown = y-1
  while (ydown >= 0){
    let squareContains = board[toChess([x,ydown])[0]][x]
    if (squareContains == "e"){
      availableSquares.availables.push(toChess([x, ydown]))
    } else if(squareContains.charAt(0) === opposingColor) {
      availableSquares.captures.push(toChess([x, ydown]))
      break;
    } else {
      break;
    }
     ydown--;
  }
  return availableSquares
}
