import letters from '../constants/letters';
import {toXY} from '../constants/matrix';
import {whatPiece} from '../constants/whatPiece';
import {toChess} from '../constants/toChessNotation';
//TODO make this handle color
//TODO refactor this to be more concise...
export function possibleKnightMoves(src, board, piece){
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
  const knightMoves = [
    [x-2,y+1],
    [x-2,y-1],
    [x+2,y+1],
    [x+2,y-1],
    [x+1,y-2],
    [x-1,y-2],
    [x+1,y+2],
    [x-1,y+2]
  ]
  const filtered = knightMoves.filter(x => x[0] >= 0 && x[1] >= 0 && x[0] <= 7 && x[1] <= 7)
  for (let i=0;i<filtered.length;i++){
    const move = toChess(filtered[i])
    const squareContains = whatPiece(toChess(filtered[i]),board)
    if(squareContains == "e"){
      availableSquares.availables.push(move)
    } else if(squareContains.charAt(0) === opposingColor){
      availableSquares.captures.push(move)
    }
  }
  return availableSquares
}
