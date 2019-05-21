import letters from '../constants/letters';
import {toXY} from '../constants/matrix';
import {toChess} from '../constants/toChessNotation';

//TODO refactor this to be more concise...
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
      let diagCaps = [board[toChess([x,yup])[0]][x+1],board[toChess([x,yup])[0]][x-1]]
      console.log(diagCaps)
      if (squareContains == "e"){
        availableSquares.availables.push(toChess([x, yup]))
      }
      if (diagCaps[0].charAt(0) === opposingColor) {
        console.log(diagCaps)
        availableSquares.captures.push(toChess([x+1,yup]))
      }
      if (diagCaps[1].charAt(0) === opposingColor){
        console.log(diagCaps)
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
      let diagCaps = [board[toChess([x,ydown])[0]][x+1],board[toChess([x,ydown])[0]][x-1]]
      if (squareContains == "e"){
        availableSquares.availables.push(toChess([x, ydown]))
      }
      if (diagCaps[0].charAt(0) === opposingColor) {
        console.log(diagCaps)
        availableSquares.captures.push(toChess([x+1,ydown]))
      }
      if (diagCaps[1].charAt(0) === opposingColor){
        console.log(diagCaps)
        availableSquares.captures.push(toChess([x-1,ydown]));
      }
       ydown--;
    }
  }
  // Capturing...
  console.log("Squares  ", availableSquares)
  return availableSquares
}
