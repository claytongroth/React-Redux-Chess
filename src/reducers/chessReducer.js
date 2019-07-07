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
        PUSH_CAPTURE_WHT,
        UNDO,
        REDO
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
    captures: []
  },
  pastBoard:[],
  board: {
    a: ["br","bn","bb","bq","bk","bb","bn","br"],
    b: ["bp","bp","bp","bp","bp","bp","bp","bp"],
    c: ["e","e","e","e","e","e","e","e"],
    d: ["e","e","e","e","e","e","e","e"],
    e: ["e","e","e","e","e","e","e","e"],
    f: ["e","e","e","e","e","e","e","e"],
    g: ["wp","wp","wp","wp","wp","wp","wp","wp"],
    h: ["wr","wn","wb","wq","wk","wb","wn","wr"]
  },
  futureBoard:[]
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
    case UNDO:{
      console.log("UNDO fired with : ", state.pastBoard)
      if (state.pastBoard.length > 1){
        const previous = state.pastBoard[state.pastBoard.length - 2]
        console.log("Previous: ", previous)
        const newPast = state.pastBoard.slice(0, state.pastBoard.length - 1)
        return {
            ...state,
            pastBoard: newPast,
            board: previous,
            futureBoard: [state.board, ...state.futureBoard]
        }
      }
    }
    case REDO:{
      if (state.futureBoard.length > 0){
        const next = state.futureBoard[0]
        const newFuture = state.futureBoard.slice(1)
         return {
           ...state,
           pastBoard: [...state.pastBoard, state.board],
           board: next,
           futureBoard: newFuture
         }
     }
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
      console.log(state.board)
      const newBoard = action.payload
      return {
        ...state,
        pastBoard: state.pastBoard.concat(state.board),
        board: newBoard
      }
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
