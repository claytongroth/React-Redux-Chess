import React from 'react';
import '../index.css';


// On click, the piece will highlight all the squares it could be moved to.
// The next click moves the piece.
class Knight extends React.Component {
  render(){
    return(
      <div className="chesspiececontainer">
        <img
          className="chesspiece"
          color = {this.props.color === "white" ? "white": "black"}
          piecename = {this.props.color === "white" ? "wn": "bn"}
          src={this.props.color === "white" ? "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png" : "https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png"}
          alt = {this.props.color === "white" ? "wn": "bn"}
          onClick={(e)=>this.props.readyToMove(e)}
        ></img>
      </div>
    )
  }
}
export default Knight;
