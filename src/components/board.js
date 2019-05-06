import React from 'react';
import '../index.css';
import Square from './square.js';

class Board extends React.Component {
  constructor() {
  super()
  this.returnSquare = this.returnSquare.bind(this)
  this.assignLetter = this.assignLetter.bind(this)
}
  returnSquare(num, lett, color, key){
    return <Square num={num} lett={lett} color={color} key={key}/>
  }
  assignLetter(num){
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H",]
    return letters[num]
  }
  render(){
    const board = [];
    for (let i=0;i<8;i++){
      let letter = this.assignLetter(i);
      for(let j=0;j<8;j++){
        ( ((i % 2 === 0) && (j % 2 === 0)) || (!(i % 2 === 0) && !(j % 2 === 0)) ) ? board.push(this.returnSquare(i, letter, "white", letter + j)) : board.push(this.returnSquare(i, letter, "black", letter + j))
      }
    }
    console.log(board)
    return(
      <div className="board">{board}</div>
    )
  }
}
export default Board;
