import {WHITE_TO_PLAY,
        BLACK_TO_PLAY,
        START,
        STOP,
        MOVE,
        CHECK,
        CHANGE_BOARD,
        HIGHLIGHT,
        CLEAR_HIGHLIGHTS,
        PUSH_CAPTURE_BLK,
        PUSH_CAPTURE_WHT
 } from '../constants/actionTypes'


export const initialChessState = {
  started: false,
  gameOver: false,
  moves: [],
  currentPlayer: "w",
  currentPlayerInCheck: false,
  whitesCaptures: [],
  blacksCaptures: [],
  highlightedSquares: {
    selectedPiece: "",
    selectedPieceSrc: "",
    availables: [],
    captures: [],
    intoCheck: []

  },
  board: {
    a: ["br","bn","bb","bk","bq","bb","bn","e"],
    b: ["bp","bp","bp","bp","bp","bp","bp","bp"],
    c: ["e","e","e","e","e","e","e","e"],
    d: ["e","br","e","wr","e","e","e","e"],
    e: ["e","e","e","e","e","e","e","e"],
    f: ["e","e","e","e","e","e","e","e"],
    g: ["wp","wp","wp","wp","wp","wp","wp","wp"],
    h: ["wr","wn","wb","wk","wq","wb","wn","e"]
  }
}



export default function reducer(state=initialChessState, action){
  switch (action.type){
    case WHITE_TO_PLAY:{
      return {...state, currentPlayer: "w"}
    }
    case BLACK_TO_PLAY:{
      return {...state, currentPlayer: "b"}
    }
    case START:{
      return {...state, started:true}
    }
    case STOP:{
      return {...state, gameOver:true}
    }
    case MOVE:{
      let newMove = state.moves.concat(action.payload)
      // search for the "piece" on the "src" square, Move it to "dest" replace src square with empty
      return {...state, moves: newMove}
    }
    case CHECK:{
      return {...state, currentPlayerInCheck: true}
    }
    case CHANGE_BOARD:{
      // search for the "piece" on the "src" square, Move it to "dest" replace src square with empty
      let newBoard = action.payload
      return {...state, board: newBoard }
    }
    case PUSH_CAPTURE_BLK:{
      let newCap = state.blacksCaptures.concat(action.payload)
      // search for the "piece" on the "src" square, Move it to "dest" replace src square with empty
      return {...state, blacksCaptures: newCap}
    }
    case PUSH_CAPTURE_WHT:{
      let newCap = state.whitesCaptures.concat(action.payload)
      // search for the "piece" on the "src" square, Move it to "dest" replace src square with empty
      return {...state,  whitesCaptures: newCap}
    }
    case HIGHLIGHT: {
      return {...state, highlightedSquares: action.payload}
    }
    case CLEAR_HIGHLIGHTS: {
      return {...state, highlightedSquares: {
        availables: [],
        captures: []

      }}
    }
    default:
      return state
  }
}
