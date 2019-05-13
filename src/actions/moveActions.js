export function movePiece(){
  return {
    type: "MOVE",
    payload: {
      color: "white",
      piece: "Bishop",
      src: "A1",
      dest: "B3"
    }
  }
}
