import letters from '../constants/letters';
import {toXY} from '../constants/matrix';
import {whatPiece} from '../constants/whatPiece';
import {toChess} from '../constants/toChessNotation';
//TODO make this handle color
//TODO refactor this to be more concise regarding diagaonals and straights....
export function possibleBishopMoves(src, board, piece){
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
  //Left diag down
  let dixl = x-1;
  let dyxl = y-1
  while (dixl >= 0 && dyxl >=0){
    let dsquareContains = whatPiece(toChess([dixl,dyxl]),board)
    if (dsquareContains == "e"){
      availableSquares.availables.push(toChess([dixl, dyxl]))
    }else if (dsquareContains.charAt(0) === opposingColor) {
      availableSquares.captures.push(toChess([dixl, dyxl]))
      break;
    }else{
      break;
    }
    dixl--;
    dyxl--;
  }
  // left diag up
  let uixl = x-1;
  let uyxl = y+1
  while (uixl >= 0 && uyxl <= 7){
    let dsquareContains = whatPiece(toChess([uixl,uyxl]),board)
    if (dsquareContains == "e"){
      availableSquares.availables.push(toChess([uixl, uyxl]))
    }else if (dsquareContains.charAt(0) === opposingColor) {
      availableSquares.captures.push(toChess([uixl, uyxl]))
      break;
    }else{
      break;
    }
    uixl--;
    uyxl++;
  }

  //Right diag down
  let dixr = x+1;
  let dyxr = y-1
  while (dixr <=7 && dyxr >=0){
    let dsquareContains = whatPiece(toChess([dixr,dyxr]),board)
    if (dsquareContains == "e"){
      availableSquares.availables.push(toChess([dixr, dyxr]))
    }else if (dsquareContains.charAt(0) === opposingColor) {
      availableSquares.captures.push(toChess([dixr, dyxr]))
      break;
    }else{
      break;
    }
    dixr++;
    dyxr--;
  }
  // Right diag up
  let uixr = x+1;
  let uyxr = y+1
  while (uixr <= 7 && uyxr <= 7){
    let dsquareContains = whatPiece(toChess([uixr,uyxr]),board)
    //console.log(dsquareContains)
    if (dsquareContains == "e"){
      availableSquares.availables.push(toChess([uixr, uyxr]))
    }else if (dsquareContains.charAt(0) === opposingColor) {
      availableSquares.captures.push(toChess([uixr, uyxr]))
      break;
    }else{
      break;
    }
    uixr++;
    uyxr++;
  }
  //console.log("Bishop", availableSquares)
  return availableSquares
}
