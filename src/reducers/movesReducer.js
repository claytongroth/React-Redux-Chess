//import initialState from '../initialState'
import {MOVE} from '../constants/actionTypes'

//export default (state = defaultState, action) => {
export default function reducer(state=[], action){
  switch (action.type){
    case MOVE:{
      return {...state, moves:{
        color: "white",
        piece: "bishop",
        src: "A1",
        dest: "B3"
      }}
    }
    default:
      return state
  }
}
