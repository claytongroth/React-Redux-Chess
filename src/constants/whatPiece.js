import letters from './letters';

// finds what piece is in a given location
export function whatPiece(loc, board){
  return board[loc.charAt(0)][loc.charAt(1)]
}
