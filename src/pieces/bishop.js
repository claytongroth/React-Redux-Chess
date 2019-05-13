import React from 'react';
import '../index.css';


// On click, the piece will highlight all the squares it could be moved to.
// The next click moves the piece.
class Bishop extends React.Component {
  render(){
    return(
      <div className="chesspiececontainer">
        <img
          className="chesspiece"
          color = {this.props.color === "white" ? "white": "black"}
          piecename = {this.props.color === "white" ? "wb": "bb"}
          src={this.props.color === "white" ? "https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png" : "https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png"}
          alt = {this.props.color === "white" ? "wb": "bb"}
          onClick={(e)=>this.props.readyToMove(e)}
        ></img>
      </div>
    )
  }
}
export default Bishop;
