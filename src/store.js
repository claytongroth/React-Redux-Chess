import {applyMiddleware, createStore, combineReducers} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import {initialChessState} from './reducers/chessReducer'
import chessReducer from './reducers/chessReducer';


const middleware = applyMiddleware(promise, thunk)//, logger)


export default createStore(combineReducers({
  chessReducer: chessReducer
  //moves,
  //started,
  //gameOver,
  //currentPlayer
}), initialChessState, middleware )
