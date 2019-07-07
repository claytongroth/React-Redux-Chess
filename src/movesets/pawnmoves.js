import letters from '../constants/letters';
import {toXY} from '../constants/matrix';
import {whatPiece} from '../constants/whatPiece';
import {toChess} from '../constants/toChessNotation';

//TODO refactor this to be more concise...
//TODO refactor to use whatPiece/findPiece instead of complex indexing
export function possiblePawnMoves(src, board, piece){
  const opposingColor = piece.charAt(0) === "w"? "b":"w"
  let hasMoved = ((opposingColor === "b" && src.charAt(0) === "g") || (opposingColor === "w" && src.charAt(0) === "b")) ? false : true

  const availableSquares = {
    selectedPiece: piece,
    selectedPieceSrc: src,
    captures: [],
    availables: [],
    intoCheck: []
  }
  const coords = toXY(src)
  const x = coords[0] // 7
  const y = coords[1] // 2

  //up ... white
  if (opposingColor === "b"){
    let yup = y+1
    const whiteTwo = hasMoved ? yup: yup+1
    while (yup <= whiteTwo){
      let squareContains = board[toChess([x,yup])[0]][x]
      // TODO Refactor
      //let diagCaps = hasMoved ? [board[toChess([x,yup])[0]][x+1],board[toChess([x,yup])[0]][x-1]] : [board[toChess([x,yup-1])[0]][x+1],board[toChess([x,yup-1])[0]][x-1]]
      let diagCaps = hasMoved ? [board[toChess([x,yup])[0]][x+1],board[toChess([x,yup])[0]][x-1]] : [board[toChess([x,yup])[0]][x+1],board[toChess([x,yup])[0]][x-1]]
      if (squareContains == "e"){
        availableSquares.availables.push(toChess([x, yup]))
      }
      if (diagCaps[0] != undefined && diagCaps[0].charAt(0) === opposingColor) {
        availableSquares.captures.push(toChess([x+1,yup]))
      }
      if (diagCaps[1] != undefined && diagCaps[1].charAt(0) === opposingColor){
        availableSquares.captures.push(toChess([x-1,yup]));
      }
      yup++;
    }
  }
  //down ... black
  if (opposingColor === "w"){
    let ydown = y-1
    const blackTwo = hasMoved? ydown:ydown-1
    while (ydown >= blackTwo){
      let squareContains = board[toChess([x,ydown])[0]][x]
      // TODO Refactor
      //let diagCaps = hasMoved ? [board[toChess([x,ydown])[0]][x+1],board[toChess([x,ydown])[0]][x-1]] : [board[toChess([x,ydown+1])[0]][x+1],board[toChess([x,ydown+1])[0]][x-1]]
      let diagCaps = hasMoved ? [board[toChess([x,ydown])[0]][x+1],board[toChess([x,ydown])[0]][x-1]] : [board[toChess([x,ydown])[0]][x+1],board[toChess([x,ydown])[0]][x-1]]
      if (squareContains == "e"){
        availableSquares.availables.push(toChess([x, ydown]))
      }
      if (diagCaps[0] != undefined && diagCaps[0].charAt(0) === opposingColor) {
        availableSquares.captures.push(toChess([x+1,ydown]))
      }
      if (diagCaps[1] != undefined && diagCaps[1].charAt(0) === opposingColor){
        availableSquares.captures.push(toChess([x-1,ydown]));
      }
       ydown--;
    }
  }
  return availableSquares
}
