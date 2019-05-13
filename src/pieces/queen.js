import React from 'react';
import '../index.css';


// On click, the piece will highlight all the squares it could be moved to.
// The next click moves the piece.
class Queen extends React.Component {
  render(){
    return(
      <div className="chesspiececontainer">
        <img
          className="chesspiece"
          color = {this.props.color === "white" ? "white": "black"}
          piecename = {this.props.color === "white" ? "wq": "bq"}
          src={this.props.color === "white" ? "https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png" : "https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png"}
          alt = {this.props.color === "white" ? "wq": "bq"}
          onClick={(e)=>this.props.readyToMove(e)}
        ></img>
      </div>
    )
  }
}
export default Queen;
