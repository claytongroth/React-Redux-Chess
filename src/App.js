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
  CLEAR_HIGHLIGHTS,
  PUSH_CAPTURE_BLK,
  PUSH_CAPTURE_WHT
} from './constants/actionTypes';
import letters from './constants/letters';
import {toXY} from './constants/matrix';
import {toChess} from './constants/toChessNotation';
import {possibleRookMoves} from './movesets/rookmoves';
import {possiblePawnMoves} from './movesets/pawnmoves';
//TODO is it better to store the function for movement in the piece components themselves or here?

// TODO [AFTER EVERYTHING IS WORKING!!!] change everything to make ABC as X, 123 as Y
// 8:  ["a", "b", "c", "d", "e", "f", "g", "h"];
//    ... ... ...
/// 1:  ["a", "b", "c", "d", "e", "f", "g", "h"];

/// change as many for loops to MAPS as can

//TODO NEXT 5/16
// Move functionality for Check/CheckMAte!
    // will need to edit availableSquares
// pawn transform
// Reverse Moves button
// Show current layer on screen


class App extends React.Component{
  squareClick(key){
    this.props.clearHighlights()
    const {selectedPiece,selectedPieceSrc,captures,availables} = this.props.highlightedSquares
    const piece = key.currentTarget.getAttribute("piece")
    const square = key.currentTarget.getAttribute("keyp")
    //console.log("Square: ", square, "Piece: ", piece, "XY: ", toXY(square))
    // maybe consider doing different highlight for enemies on hover....
    if (piece != "e" && piece.charAt(0) === this.props.currentPlayer){
      this.calculateAvailableSquares(square, piece, this.props.board)
    }
    if ((availables.indexOf(square) !== -1) ||(captures.indexOf(square) !== -1) ){
      this.props.dispatchMove(selectedPiece, selectedPieceSrc, square)
      this.readyToMove(selectedPiece, selectedPieceSrc, square, captures)
    }
  }
  componentDidUpdate(prevProps){
    //console.log("component did update")
    if(prevProps.board !== this.props.board){
      //console.log("updating board....", this.props.board)
    }
 }
  calculateAvailableSquares(pos, piece, board){
    console.log("calculateAvailableSquares fired with: ", pos, piece, board)
    let moves;
    switch(piece){
      case "wr": case "br":
        moves = possibleRookMoves(pos, this.props.board, piece)
        this.props.highlightSquares(moves)
        break;
      case "wp": case "bp":
        moves = possiblePawnMoves(pos, this.props.board, piece)
        this.props.highlightSquares(moves)
        break;
        //this.readyToMove(piece, src, dest)
        // next a function where I can click and submit a move...
        //// this function also alows highlighting...
    }
  }
  readyToMove(selectedPiece, selectedPieceSrc, square, captures){
      const srcrow = selectedPieceSrc.charAt(0),
            srccol = selectedPieceSrc.charAt(1),
            dstrow = square.charAt(0),
            dstcol = square.charAt(1),
            capture = this.props.board[dstrow][dstcol],
            newBoard = {...this.props.board}
      newBoard[srcrow][srccol] = "e"
      newBoard[dstrow][dstcol] = selectedPiece
      this.props.updateBoard(newBoard)
      captures.indexOf(square) !== -1 &&  selectedPiece.charAt(0) === "w" ? this.props.pushWhiteCap(capture) : console.log("WHITE PIECE MOVED!!!")
      captures.indexOf(square) !== -1 &&  selectedPiece.charAt(0) === "b" ? console.log("White PIECE CAPTURED!!!") : console.log("Black PIECE MOVED!!!")
      this.props.currentPlayer === "w" ? this.props.blackToPlay() : this.props.whiteToPlay()
      this.props.clearHighlights();
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

          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 no-gutters">
            This is my React-Redux Chess game!
            <br/>
            <button onClick={this.props.onClickButtonStart}>Start the Game</button>
            <button onClick={this.props.onClickButtonStop}>Stop the Game</button>
            <br/>
            {this.props.gameOver ? "GAME OVER": this.props.currentPlayer + " To play..."}
            <br/>
            {"Current Player: " + this.props.currentPlayer}
            <br/>
            {"Black Captured: " + this.props.blacksCaptures}
            <br/>
            {"White Captured: " + this.props.whitesCaptures}
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
    currentPlayerInCheck: state.chessReducer.currentPlayerInCheck,
    whitesCaptures: state.chessReducer.whitesCaptures,
    blacksCaptures: state.chessReducer.blacksCaptures,
    highlightedSquares: state.chessReducer.highlightedSquares,
    board: state.chessReducer.board
  }
};

const mapDispatchToProps = dispatch => ({
  onClickButtonStart: () => dispatch({ type: START}),
  onClickButtonStop: () => dispatch({ type: STOP}),
  whiteToPlay: ()=> dispatch({ type: WHITE_TO_PLAY}),
  blackToPlay: ()=> dispatch({ type: BLACK_TO_PLAY}),
  dispatchMove: (piece, src, dst) => dispatch({ type: MOVE, payload:{
    piece: piece,
    src: src,
    dst: dst
  }}),
  pushWhiteCap: (piece)=> dispatch({type: PUSH_CAPTURE_WHT, payload: piece}),
  pushBlackCap: (piece)=> dispatch({type: PUSH_CAPTURE_BLK, payload: piece}),
  updateBoard: (updBoard)=> dispatch({type: CHANGE_BOARD, payload: updBoard}),
  onClickButtonMove: (updBoard)=> dispatch({type: CHANGE_BOARD, payload: updBoard}),
  highlightSquares: (squares)=> dispatch({type: HIGHLIGHT, payload: squares}),
  clearHighlights: ()=> dispatch({type: CLEAR_HIGHLIGHTS})
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
//connect(mapStateToProps, mapDispatchToProps)(App)


// TODO next:
//________________________________________________________
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
