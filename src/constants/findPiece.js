import letters from './letters';

// finds a piece given a location "g5"
export function findPiece(piece, board){
  let loc = [];
  for (let i=0;i<letters.length;i++){
    const row = board[letters[i]]
    for(let j=0;j<7;j++){
      const square = letters[i] + j
      if (row[j] === piece){loc.push(square)}
    }
  }
  if (loc.length === 1){loc = loc[0]}
  return loc
}
