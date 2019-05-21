import letters from '../constants/letters';
// fire this before returning to availableSquare is "piece"Moves.js

// Consider just having a king in check checker and reversing moves

export function isMoveIntoCheck(piece, src, aSquares, board){
  console.log("fired with: ", piece, src, aSquares, board)
  const color = piece.charAt(0) === "w"? "w": "b",
        src_row = src.charAt(0),
        src_col = src.charAt(1)
  //let movesArray = []
  let intoCheckArray = []
  // For every availableSquare
  aSquares.map( (aSquare) => {
    // calculate the resulting board
    let resultingBoard = JSON.parse(JSON.stringify(board))
    resultingBoard[src_row][src_col] = "e"
    resultingBoard[aSquare[0]][aSquare[1]] = piece
    // iterate through all enemy pieces
    console.log("Resulting Board: ", resultingBoard)
    letters.map(
      row => (resultingBoard[row]).map(
        square => {
          switch(square){
            case "br":
              console.log("  Here fire the possibleRookMoves function with: ", square, " at ", row + resultingBoard[row].indexOf(square))
              // if this piece can capture king push the square to the intoCheckArray
              //TODO write actual logic for the king...
              intoCheckArray.push(aSquare)
              // if not push to movesArray
              //movesArray.push(aSquare)
              break;
          }
        }
      )
    )
  })
  //movesArray = new Set([...movesArray]);
  const intoCheckSet = new Set([...intoCheckArray]);
  intoCheckArray = Array.from(intoCheckSet)
  return intoCheckArray
}
