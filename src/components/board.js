import React from 'react';
import '../index.css';
import {connect} from 'react-redux'
import Square from './square.js';
import Pawn from '../pieces/pawn';
import Queen from '../pieces/queen';
import King from '../pieces/king';
import Bishop from '../pieces/bishop';
import Rook from '../pieces/rook';
import Knight from '../pieces/knight';
import letters from '../constants/letters';


class Board extends React.Component {
  constructor() {
  super()
  this.returnSquare = this.returnSquare.bind(this)
  this.makeLayout = this.makeLayout.bind(this)
  }
  makeLayout(piece){
    switch(piece){
      case "bp":
        return <Pawn readyToMove={(e)=>this.props.moveMe(e)} color="black"/>
      case "wp":
        return <Pawn readyToMove={(e)=>this.props.moveMe(e)} color="white"/>
      case "wq":
        return <Queen readyToMove={(e)=>this.props.moveMe(e)} color="white"/>
      case "bq":
        return <Queen readyToMove={(e)=>this.props.moveMe(e)} color="black"/>
      case "wk":
        return <King readyToMove={(e)=>this.props.moveMe(e)} color="white"/>
      case "bk":
        return <King readyToMove={(e)=>this.props.moveMe(e)} color="black"/>
      case "wr":
        return <Rook readyToMove={(e)=>this.props.moveMe(e)} color="white"/>
      case "br":
        return <Rook readyToMove={(e)=>this.props.moveMe(e)} color="black"/>
      case "wn":
        return <Knight readyToMove={(e)=>this.props.moveMe(e)} color="white"/>
      case "bn":
        return <Knight readyToMove={(e)=>this.props.moveMe(e)} color="black"/>
      case "wb":
        return <Bishop readyToMove={(e)=>this.props.moveMe(e)} color="white"/>
      case "bb":
        return <Bishop readyToMove={(e)=>this.props.moveMe(e)} color="black"/>
      default:
        return null
    }
  }
  returnSquare(num, lett, color, key){
    let arrayHighlight = this.props.highlightedSquares.availables
    let captureHighlight = this.props.highlightedSquares.captures
    return <Square
              boardclick={(key)=> this.props.parentMethod(key)}
              num={num}
              lett={lett}
              color={color}
              highlightAvailable = {arrayHighlight.indexOf(key) === -1 ? false: true}
              highlightCapture = {captureHighlight.indexOf(key) === -1 ? false: true}
              key={key}
              currentpiecename={this.props.board[lett][num]}
              currentpiece={this.makeLayout(this.props.board[lett][num])}
            />
  }
  render(){
    const board = [];
    for (let p=0; p < letters.length; p++){
      let letter = Object.keys(this.props.board)[p]
      for (let q=0; q < this.props.board[letters[p]].length; q++){
        let number = q;
      ( ((p % 2 === 0) && (q % 2 === 0)) || (!(p % 2 === 0) && !(q % 2 === 0)) ) ? board.push(this.returnSquare(number, letter, "white", letter+number)) : board.push(this.returnSquare(number, letter, "black", letter+number))
      }
    }

    return(
      <div className="board">{board}</div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("state from inside mapStateToProps: ", {...state})
  return {
    started: state.chessReducer.started,
    gameOver: state.chessReducer.gameOver,
    moves: state.chessReducer.moves,
    currentPlayer: state.chessReducer.currentPlayer,
    currentPlayerInCheck: state.chessReducer.currentPlayerInCheck,
    whitesCaptures: state.chessReducer.whitesCaptures,
    blacksCaptures: state.chessReducer.blacksCaptures,
    highlightedSquares: state.chessReducer.highlightedSquares,
    board: state.chessReducer.board,
    pastBoard:state.chessReducer.pastBoard,
    futureBoard:state.chessReducer.futureBoard
  }
};


export default connect(mapStateToProps)(Board);
