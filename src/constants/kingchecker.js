import letters from '../constants/letters';
import {findPiece} from '../constants/findPiece';
import {whatPiece} from '../constants/whatPiece';
import {possibleQueenMoves} from '../movesets/queenmoves';
import {possiblePawnMoves} from '../movesets/pawnmoves';
import {possibleKnightMoves} from '../movesets/knightmoves';
import {possibleKingMoves} from '../movesets/kingmoves';
import {possibleRookMoves} from '../movesets/rookmoves';
import {possibleBishopMoves} from '../movesets/bishopmoves';


// check if the king of this color can be captured on the new board
export function kingChecker(newBoard, color){
  let wouldBeCheck;
  let opposingColor = color === "w"? "b" : "w"
  let kingCaps = []
  // consume the new board
  const kingPos = findPiece(color+"k", newBoard)
  //console.log("the King is at ", kingPos)
  // fire the following functions for the king piece to fill its availableSquares object.
  // do this for just queen moves!!!!!!! whatPiece(rooks[i], newBoard) === (opposingColor + "r" || opposingColor + "b" || opposingColor + "q")
  const queens = possibleQueenMoves(kingPos, newBoard, color+"k").captures
  for (let i=0;i<queens.length;i++){
     if (whatPiece(queens[i], newBoard) === opposingColor + "q"){
       kingCaps.push(queens[i])
     }
  }
  const rooks = possibleRookMoves(kingPos, newBoard, color+"k").captures
  for (let i=0;i<rooks.length;i++){
   if (whatPiece(rooks[i], newBoard) === opposingColor + "r"){
     kingCaps.push(rooks[i])
   }
  }
  const bishops = possibleBishopMoves(kingPos, newBoard, color+"k").captures
  for (let i=0;i<bishops.length;i++){
    if (whatPiece(bishops[i], newBoard) === opposingColor + "b"){
      kingCaps.push(bishops[i])
    }
  }

  const pawns = possiblePawnMoves(kingPos, newBoard, color+"k").captures
  for (let i=0;i<pawns.length;i++){
    if (whatPiece(pawns[i], newBoard) === opposingColor + "p"){
      kingCaps.push(pawns[i])
    }
  }
  const knights = possibleKnightMoves(kingPos, newBoard, color+"k").captures
  for (let i=0;i<knights.length;i++){
    if (whatPiece(knights[i], newBoard) === opposingColor + "n"){
      kingCaps.push(knights[i])
    }
  }
  const kings = possibleKingMoves(kingPos, newBoard, color+"k").captures
  for (let i=0;i<kings.length;i++){
    if (whatPiece(kings[i], newBoard) === opposingColor + "k"){
      kingCaps.push(kings[i])
    }
  }
  wouldBeCheck = kingCaps.length > 0 ? true : false
  //TODO return the squares that could put you in check to highlight them....
  return wouldBeCheck //true or false
}
