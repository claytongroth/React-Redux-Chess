import letters from './letters';
export function toChess(pos){
  let numberx = pos[0]
  let revLetters;
  letters[0] === "a" ?  revLetters = letters.reduce((ary, ele) => {ary.unshift(ele); return ary}, []) : revLetters = letters
  let lettery = revLetters[pos[1]]
  return lettery.toString() + numberx.toString()
}
