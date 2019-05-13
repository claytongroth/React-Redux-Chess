//import initialState from '../initialState'
import {STOP} from '../constants/actionTypes'

export default function reducer(state=false, action){
  switch (action.type){
    case STOP:{
      return {...state, gameOver:true}
    }
    default:
      return state
  }
}
