import React from 'react';
import '../index.css';


// On click, the piece will highlight all the squares it could be moved to.
// The next click moves the piece.
class King extends React.Component {
  render(){
    return(
      <div className="chesspiececontainer">
        <img
          className="chesspiece"
          color = {this.props.color === "white" ? "white": "black"}
          piecename = {this.props.color === "white" ? "wk": "bk"}
          src={this.props.color === "white" ? "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png" : "https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png"}
          alt = {this.props.color === "white" ? "wk": "bk"}
          onClick={(e)=>this.props.readyToMove(e)}
        ></img>
      </div>
    )
  }
}
export default King;
