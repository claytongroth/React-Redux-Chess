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
  PUSH_CAPTURE_WHT,
  UNDO,
  REDO
} from './constants/actionTypes';
import letters from './constants/letters';
import {toXY} from './constants/matrix';
import {toChess} from './constants/toChessNotation';
import {kingChecker} from './constants/kingchecker';
import {checkmateChecker} from './constants/checkmateChecker';
import {possibleRookMoves} from './movesets/rookmoves';
import {possiblePawnMoves} from './movesets/pawnmoves';
import {possibleQueenMoves} from './movesets/queenmoves';
import {possibleBishopMoves} from './movesets/bishopmoves';
import {possibleKingMoves} from './movesets/kingmoves';
import {possibleKnightMoves} from './movesets/knightmoves';
import {capToPiece} from './constants/capToPiece';
import Header from './components/Header';


// TODO change everything to make ABC as X, 123 as Y
// 8:  ["a", "b", "c", "d", "e", "f", "g", "h"];


class App extends React.Component{
  squareClick(key){
    this.props.clearHighlights()
    const {selectedPiece,selectedPieceSrc,captures,availables} = this.props.highlightedSquares
    const piece = key.currentTarget.getAttribute("piece")
    const square = key.currentTarget.getAttribute("keyp")

    if (piece != "e" && piece.charAt(0) === this.props.currentPlayer){
      this.calculateAvailableSquares(square, piece, this.props.board)
    }
    if ((availables.indexOf(square) !== -1) ||(captures.indexOf(square) !== -1) ){
      this.props.dispatchMove(selectedPiece, selectedPieceSrc, square)
      this.readyToMove(selectedPiece, selectedPieceSrc, square, captures)
    }
  }
  componentDidUpdate(prevProps){
    if(prevProps.board !== this.props.board){
      //console.log("updating board....", this.props.board)
    }
  }
  calculateAvailableSquares(pos, piece, board){
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
      case "wq": case "bq":
        moves = possibleQueenMoves(pos, this.props.board, piece)
        this.props.highlightSquares(moves)
        break;
      case "wb": case "bb":
        moves = possibleBishopMoves(pos, this.props.board, piece)
        this.props.highlightSquares(moves)
        break;
      case "wk": case "bk":
        moves = possibleKingMoves(pos, this.props.board, piece)
        this.props.highlightSquares(moves)
        break;
      case "wn": case "bn":
        moves = possibleKnightMoves(pos, this.props.board, piece)
        this.props.highlightSquares(moves)
        break;
      default:
        break;
    }
  }
  readyToMove(selectedPiece, selectedPieceSrc, square, captures){
      const srcrow = selectedPieceSrc.charAt(0),
            srccol = selectedPieceSrc.charAt(1),
            dstrow = square.charAt(0),
            dstcol = square.charAt(1),
            color = selectedPiece.charAt(0),
            capture = this.props.board[dstrow][dstcol],
            newBoard = JSON.parse(JSON.stringify(this.props.board)) // {...this.props.board}
      newBoard[srcrow][srccol] = "e"
      newBoard[dstrow][dstcol] = selectedPiece
      //let the move appear, then validate it
      this.props.updateBoard(newBoard)
      if (this.validateMove(newBoard, color) === false){
        this.props.updateBoard(newBoard)
        captures.indexOf(square) !== -1 &&  selectedPiece.charAt(0) === "w" ? this.props.pushWhiteCap(capture) : console.log("WHITE PIECE MOVED!!!")
        captures.indexOf(square) !== -1 &&  selectedPiece.charAt(0) === "b" ? this.props.pushBlackCap(capture) : console.log("Black PIECE MOVED!!!")
        this.props.currentPlayer === "w" ? this.props.blackToPlay() : this.props.whiteToPlay();
        //TODO, check if the move results in checkmate here
        if (checkmateChecker(newBoard, color) === true){ alert("Checkmate! "+ color+ " wins!")}
        this.props.clearHighlights();
      } else {
        setTimeout(()=>{

          this.props.undoAction();
          alert("This move will place you in check!");

        },200);
      }
  }
  moveMeParent(e){
  }
  backOne(){
    this.props.undoAction()
    //if the past board is different... change player
    if(this.props.pastBoard.length > 0 && this.props.pastBoard !== this.props.board){
      this.props.currentPlayer === "w" ? this.props.blackToPlay() : this.props.whiteToPlay();
    }
  }
  forwardOne(){
    this.props.redoAction()
    if(this.props.futureBoard.length > 0 && this.props.futureBoard !== this.props.board){
      this.props.currentPlayer === "w" ? this.props.blackToPlay() : this.props.whiteToPlay();
    }
  }
  blackGraveyard(){
    return (<div className="captured">{capToPiece(this.props.blacksCaptures)}</div>)
  }
  whiteGraveyard(){
    return (<div className="captured">{capToPiece(this.props.whitesCaptures)}</div>)
  }
  validateMove(newBoard, color){
    let moveintoCheck;
    moveintoCheck = kingChecker(newBoard, color)
    console.log("moveintoCheck returned: ", moveintoCheck)
    return moveintoCheck;
  }
  render(){
    return (
      <div className="App">
         <Header />
        <hr/>
        <div className="container fluid">
          <div id="main" className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 boardside no-gutters border border-secondary">
              <Board
                parentMethod={(key)=>this.squareClick(key)}
                moveMe={(e)=>this.moveMeParent(e)}
              />

            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 statside no-gutters border border-secondary">
              <br/>
              <button className="start-game-btn" onClick={this.props.onClickButtonStart}>Start the Game</button>
              <button className="end-game-btn" onClick={this.props.onClickButtonStop}>Stop the Game</button>

              <br/>
              <button className="redo-btn" onClick={()=>this.forwardOne()}>REDO</button>
              <button className="undo-btn" onClick={()=>this.backOne()}>UNDO</button>
              <div id="graverow" className="row">
                <div id= "blackgrave" className="col-lg-6 col-md-6 col-sm-6 border border-light">
                  {"Black Captured: "}
                  <br/>
                  { this.blackGraveyard()}
                </div>
                <div id="whitegrave" className="col-lg-6 col-md-6 col-sm-6 border border-dark">
                  {"White Captured: "}
                  <br/>
                  { this.whiteGraveyard()}
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 current border border-secondary">
                {"Current Player: "}{ this.props.currentPlayer === "w" ? "White" : "Black"}
              </div>
              <br/>
              {this.props.gameOver ? "GAME OVER": null}
              <br/>
            </div>
          </div>
        </div>
      </div>
    );
    }
}

const mapStateToProps = (state) => {
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
  clearHighlights: ()=> dispatch({type: CLEAR_HIGHLIGHTS}),
  undoAction: ()=> dispatch({type: UNDO}),
  redoAction: ()=> dispatch({type: REDO})
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
