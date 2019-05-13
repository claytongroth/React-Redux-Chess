//import initialState from '../initialState'
import {WHITE_TO_PLAY, BLACK_TO_PLAY} from '../constants/actionTypes'

// this isn't right...
export default function reducer(state="white", action){
  switch (action.type){
    case WHITE_TO_PLAY:{
      return {...state, currentPlayer: "black"}
    }
    case BLACK_TO_PLAY:{
      return {...state, currentPlayer: "white"}
    }
    default:
      return state
  }
}
