//import initialState from '../initialState'
import {START} from '../constants/actionTypes'

export default function reducer(state=false, action){
  switch (action.type){
    case START:{
      return {...state, started:true}
    }
    default:
      return state
  }
}
