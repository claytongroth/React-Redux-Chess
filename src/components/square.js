import React from 'react';
import '../index.css';


class Square extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button
        onClick={(e)=>this.props.boardclick(e)}
        keyp={this.props.lett + this.props.num}
        className={"Square " + this.props.color + (this.props.highlightAvailable? " highlighted": this.props.highlightCapture? " capturable" : "")}
        piece={this.props.currentpiecename}
      >
        {this.props.currentpiece}
      </button>
    );
  }
}
export default Square;
