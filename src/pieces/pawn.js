import React from 'react';
import '../index.css';


// On click, the piece will highlight all the squares it could be moved to.
// The next click moves the piece.
class Pawn extends React.Component {
  render(){
    return(
      <div className="chesspiececontainer">
        <img
          className="chesspiece"
          color = {this.props.color === "white" ? "white": "black"}
          piecename = {this.props.color === "white" ? "wp": "bp"}
          position = {"testposition"}
          moved = "false"
          src={this.props.color === "white" ? "https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png" : "https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png"}
          alt = {this.props.color === "white" ? "wp": "bp"}
          onClick={(e)=>this.props.readyToMove(e)}
        ></img>
      </div>
    )
  }
}
export default Pawn;
