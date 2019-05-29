import Pawn from '../pieces/pawn';
import Rook from '../pieces/rook';
import Knight from '../pieces/knight';
import Bishop from '../pieces/bishop';
import Queen from '../pieces/queen';

import React from 'react';
import ReactDOM from 'react-dom';

export function capToPiece(captures){
  let graveYard =[];
  captures.map((piece) => {
    switch(piece){
      case("bp"):
        graveYard.push(<div>{<Pawn color="black"/>}</div>)
        break;
      case("wp"):
        graveYard.push(<div>{<Pawn color="white"/>}</div>)
        break;
      case("wn"):
        graveYard.push(<div>{<Knight color="white"/>}</div>)
        break;
      case("bn"):
        graveYard.push(<div>{<Knight color="black"/>}</div>)
        break;
      case("wr"):
        graveYard.push(<div>{<Rook color="white"/>}</div>)
        break;
      case("br"):
        graveYard.push(<div>{<Rook color="black"/>}</div>)
        break;
      case("wb"):
        graveYard.push(<div>{<Bishop color="white"/>}</div>)
        break;
      case("bb"):
        graveYard.push(<div>{<Bishop color="black"/>}</div>)
        break;
      case("wq"):
        graveYard.push(<div>{<Queen color="white"/>}</div>)
        break;
      case("bq"):
        graveYard.push(<div>{<Queen color="black"/>}</div>)
        break;
      default:
        break;
    }
  })
  return graveYard
}
