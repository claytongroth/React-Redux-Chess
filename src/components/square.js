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
        // could have a highlighted squares section of state and work from there
        piece={this.props.currentpiecename}
      >
        {this.props.currentpiece}
      </button>
    );
  }
}
export default Square;


/*
export default function Square(props) {
    return (
      <button
        onClick={(e)=>props.boardclick(e)}
        keyp={props.lett + props.num}
        //ref = {props.lett + props.num}
        className={"Square " + props.color}
        piece={props.currentpiecename}
      >
        {props.currentpiece}
      </button>
    );

}
*/
