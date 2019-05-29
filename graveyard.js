/*
for (let i=8; i>0; i--){
  let rowname = i;
  for(let j=0;j< letters.length; j++){
    ( ((i % 2 === 0) && (j % 2 === 0)) || (!(i % 2 === 0) && !(j % 2 === 0)) ) ? board.push(this.returnSquare(i, letters[j], "white", letters[j] + i)) : board.push(this.returnSquare(i, letters[j], "black", letters[j] + i))
  }
}
  */


  // fire isMoveIntoCheck
  // if a move is in the returned array, remove it from captures or availables
  //return availableSquares
  //isMoveIntoCheck(piece, src, aSquares, board)
  const intoCheckMoves = isMoveIntoCheck(piece, src, availableSquares.availables.concat(availableSquares.captures), board)
  availableSquares.intoCheck = intoCheckMoves

  const availables_notCheck = availableSquares.availables.filter( x => availableSquares.intoCheck.indexOf(x) === -1)
  availableSquares.availables = availables_notCheck

  const captures_notCheck = availableSquares.captures.filter( x => availableSquares.intoCheck.indexOf(x) === -1)
  availableSquares.captures = captures_notCheck

  console.log("availables_notCheck: ", availables_notCheck, "captures_notCheck", captures_notCheck)
  console.log(availableSquares)
