import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import Board from './components/board';
import './App.css';
import {connect} from 'react-redux'
import Pawn from './pieces/pawn'
import {
  START,
  MOVE,
  STOP,
  WHITE_TO_PLAY,
  BLACK_TO_PLAY,
  CHANGE_BOARD,
  HIGHLIGHT,
  CLEAR_HIGHLIGHTS
} from './constants/actionTypes';
import letters from './constants/letters';
import {toXY} from './constants/matrix';
import {toChess} from './constants/toChessNotation';
import {possibleRookMoves} from './movesets/rookmoves';
//TODO is it better to store the function for movement in the piece components themselves or here?

// TODO [AFTER EVERYTHING IS WORKING!!!] change everything to make ABC as X, 123 as Y
// 8:  ["a", "b", "c", "d", "e", "f", "g", "h"];
//    ... ... ...
/// 1:  ["a", "b", "c", "d", "e", "f", "g", "h"];

//TODO NEXT 5/12
// create the ready to move function
// complete all move functionality for rook, then move on to other pieces.
const newBoard =   {
  a: ["br","bn","bb","bk","bq","bb","bn","br"],
  b: ["bp","bp","bp","bp","bp","bp","bp","bp"],
  c: ["e","e","e","e","e","e","e","e"],
  d: ["e","e","e","e","e","e","e","e"],
  e: ["e","e","e","e","e","e","e","e"],
  f: ["e","e","wn","e","e","e","e","e"],
  g: ["wp","wp","wp","wp","wp","wp","wp","wp"],
  h: ["wr","e","wb","wk","wq","wb","wn","wr"]
}

class App extends React.Component{
  squareClick(key){

    //TODO wrap all of this in a conditional for whose turn it is?
    this.props.clearHighlights()
    const {selectedPiece,selectedPieceSrc,captures,availables} = this.props.highlightedSquares
    const piece = key.currentTarget.getAttribute("piece")
    const square = key.currentTarget.getAttribute("keyp")
    console.log("Square: ", square, "Piece: ", piece, "XY: ", toXY(square))
    // maybe consider doing different highlight for enemies on hover....
    if (piece != "e" && piece.charAt(0) === this.props.currentPlayer){
      this.calculateAvailableSquares(square, piece, this.props.board)
    }
    if ((availables.indexOf(square) !== -1) ||(captures.indexOf(square) !== -1) ){
      console.log("keyp ", square, " is in the avialable squares for: ", selectedPiece, "source of selected: ", selectedPieceSrc)
      this.props.dispatchMove(selectedPiece, selectedPieceSrc, square)
      //this.props.clearHighlights()
      //TODO Get the board updated.... just use the src and dst to overwrite part of board

    }
  }
  componentDidUpdate(prevProps){
    console.log("component did update")
    if(prevProps.board !== this.props.board){
      console.log("updating board....", this.props.board)
    }
 }
  calculateAvailableSquares(pos, piece, board){
    console.log("calculateAvailableSquares fired with: ", pos, piece, board)
    let moves;
    switch(piece){
      case "wr": case "br":
        moves = possibleRookMoves(pos, this.props.board, piece)
        this.props.highlightSquares(moves)
        //this.readyToMove(piece, src, dest)
        // next a function where I can click and submit a move...
        //// this function also alows highlighting...
    }
  }
  readyToMove(){
    // allow hover styles on availableSquares
    // only fire the event if clicking on highlighted squares.
    // next click fires the actions: CHANGE_BOARD, and MOVE
    ////// IF I capture another piece, then add to white/black's Captures
    // after this, it fire the WHITE_TO_PLAY/ BLACK_TO_PLAY action

  }
  moveMeParent(e){
  }
  render(){
    return (
      <div className="App">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 boardside no-gutters">
            <Board
              parentMethod={(key)=>this.squareClick(key)}
              moveMe={(e)=>this.moveMeParent(e)}
            />
            {this.props.gameOver ? "GAME OVER": this.props.currentPlayer + " To play..."}
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 no-gutters">
            This is my React-Redux Chess game!
            <br/>
            <button onClick={this.props.onClickButtonStart}>Start the Game</button>
            <button onClick={this.props.onClickButtonStop}>Stop the Game</button>
            <button onClick={this.props.onClickButtonSwitch}>Switch the Player</button>
            <button onClick={this.props.onClickButtonMove}>Test Move</button>
            <Pawn/>
          </div>
        </div>
      </div>
    );
    }
}

// get the piece to consolelog in the click square
// Set out a board state that stores the board each move.
// its initial state is the starting layout.
// the board populatess from state.chessReducer.board
const mapStateToProps = (state) => {
  //console.log("state from inside mapStateToProps: ", {...state})
  return {
    started: state.chessReducer.started,
    gameOver: state.chessReducer.gameOver,
    moves: state.chessReducer.moves,
    currentPlayer: state.chessReducer.currentPlayer,
    inCheck: state.chessReducer.inCheck,
    highlightedSquares: state.chessReducer.highlightedSquares,
    board: state.chessReducer.board
  }
};

const mapDispatchToProps = dispatch => ({
  onClickButtonStart: () => dispatch({ type: START}),
  onClickButtonStop: () => dispatch({ type: STOP}),
  onClickButtonSwitch: ()=> dispatch({ type: WHITE_TO_PLAY}),
  onClickButtonMove: ()=> dispatch({ type: MOVE, payload: {
    piece: "wn",
    src: "b1",
    dst: "c3"
  }}),

  dispatchMove: (piece, src, dst) => dispatch({ type: MOVE, payload:{
    piece: piece,
    src: src,
    dst: dst
  }}),
  onClickButtonMove: ()=> dispatch({type: CHANGE_BOARD, payload: newBoard}),
  highlightSquares: (squares)=> dispatch({type: HIGHLIGHT, payload: squares}),
  clearHighlights: ()=> dispatch({type: CLEAR_HIGHLIGHTS})
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
//connect(mapStateToProps, mapDispatchToProps)(App)


// TODO next:
//________________________________________________________
// Next click goes to the MOVE/ CHANGE_BOARD actions
// Clear out unecessary data clutter
// piece components contain their behavior info


// Sidebar with move-by move readout
// Sidebar with "Taken Pieces"
//// able to download or send moves readout to an email address

////stretch Goals:
/////////////////////////////////
// login with backend
// play against ME!
// each person gets an email when another play made a move
