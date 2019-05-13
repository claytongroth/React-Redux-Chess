import React from 'react';
import '../index.css';


// On click, the piece will highlight all the squares it could be moved to.
// The next click moves the piece.
class Rook extends React.Component {
  render(){
    return(
      <div className="chesspiececontainer">
        <img
          className="chesspiece"
          color = {this.props.color === "white" ? "white": "black"}
          piecename = {this.props.color === "white" ? "wr": "br"}
          src={this.props.color === "white" ? "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png" : "https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png"}
          alt = {this.props.color === "white" ? "wr": "br"}
          onClick={(e)=>this.props.readyToMove(e)}
        ></img>
      </div>
    )
  }
}
export default Rook;
