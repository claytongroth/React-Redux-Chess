import letters from '../constants/letters';
import {findPiece} from '../constants/findPiece';
import {whatPiece} from '../constants/whatPiece';
import {possibleQueenMoves} from '../movesets/queenmoves';
import {possiblePawnMoves} from '../movesets/pawnmoves';
import {possibleKnightMoves} from '../movesets/knightmoves';
import {possibleKingMoves} from '../movesets/kingmoves';
import {possibleRookMoves} from '../movesets/rookmoves';
import {possibleBishopMoves} from '../movesets/bishopmoves';


export function checkmateChecker(newBoard, color){
  let opposingColor = color === "w"? "b" : "w";
  console.log("checking if ", opposingColor, " is in checkmate...")
  const kingPos = findPiece(opposingColor+"k", newBoard)
  const kingCanGo = [];
  const kingCantGo = [];
  // kings current spot too
  kingCanGo.push(kingPos)
  kingCanGo.push(...possibleKingMoves(kingPos, newBoard, opposingColor).availables)
  kingCanGo.push(...possibleKingMoves(kingPos, newBoard, opposingColor).captures)

  for (let i=0;i<7;i++){
    for(let j=0;j<newBoard[letters[i]].length;j++){
      switch(newBoard[letters[i]][j]){
        case(color+"q"):
          kingCantGo.push(...possibleQueenMoves(letters[i]+j, newBoard, color).availables)
          kingCantGo.push(...possibleQueenMoves(letters[i]+j, newBoard, color).captures)
          break;
        case(color+"r"):
          kingCantGo.push(...possibleRookMoves(letters[i]+j, newBoard, color).availables)
          kingCantGo.push(...possibleRookMoves(letters[i]+j, newBoard, color).captures)
          break;
        case(color+"b"):
          kingCantGo.push(...possibleBishopMoves(letters[i]+j, newBoard, color).availables)
          kingCantGo.push(...possibleBishopMoves(letters[i]+j, newBoard, color).captures)
          break;
        case(color+"n"):
          kingCantGo.push(...possibleKnightMoves(letters[i]+j, newBoard, color).availables)
          kingCantGo.push(...possibleKnightMoves(letters[i]+j, newBoard, color).captures)
          break;
        case(color+"p"):
          kingCantGo.push(...possiblePawnMoves(letters[i]+j, newBoard, color).captures)
          break;
        case(color+"k"):
          kingCantGo.push(...possibleKingMoves(letters[i]+j, newBoard, color).availables)
          kingCantGo.push(...possibleKingMoves(letters[i]+j, newBoard, color).captures)
          break;
        default:
          break;

      }
    }
  }
  console.log(opposingColor, " king can go: ", kingCanGo)
  console.log(opposingColor, " king cannot go: ", kingCantGo)

  const checkMate = kingCanGo.every(x => kingCantGo.indexOf(x) > -1);
  console.log(opposingColor, " is in checkmate? ", checkMate)
  return checkMate
}
