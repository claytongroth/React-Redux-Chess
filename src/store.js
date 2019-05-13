import {applyMiddleware, createStore, combineReducers} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import {initialChessState} from './reducers/chessReducer'
import chessReducer from './reducers/chessReducer';


const middleware = applyMiddleware(promise, thunk, logger)


export default createStore(combineReducers({
  chessReducer: chessReducer
  //moves,
  //started,
  //gameOver,
  //currentPlayer
}), initialChessState, middleware )


// LEFT OFF HERE https://www.youtube.com/watch?v=nrg7zhgJd4w

/*
GOALS:
_______________
>get redux actions and reducers set up with a state that logs all moves
>> moves logged like
            moves = [{
              player: "white",
              piece: "Bishop",
              src: "A1",
              dest: "B2",
              incheck: false,
              incheckmate: false
            },
            {
              player: "black",
              piece: "pawn",
              src: "E7",
              dest: "E9",
              incheck: false,
              incheckmate: false
            },

            ]
>> get logic of pieces


*/
