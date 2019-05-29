import letters from '../constants/letters';
import {toXY} from '../constants/matrix';
import {whatPiece} from '../constants/whatPiece';
import {toChess} from '../constants/toChessNotation';
//TODO make this handle color
//TODO refactor this to be more concise regarding diagaonals and straights....
export function possibleKingMoves(src, board, piece){
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
    break;
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
    break;
  }
  //straight left
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
    break;
  }
  //Straight right
  let ixr = x+1
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
     break;
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
    break;
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
    break;
  }
  //straight up
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
     break;
  }
  //straight down
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
     break;
  }
  //console.log("King", availableSquares)
  return availableSquares
}
