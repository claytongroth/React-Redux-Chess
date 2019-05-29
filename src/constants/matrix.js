import letters from './letters';

export function toXY(pos) {
  //console.log("POS HERE", pos)
  let y = pos.charAt(0)
  let x = parseInt(pos.charAt(1))
  y = letters.reduce((ary, ele) => {ary.unshift(ele); return ary}, []).indexOf(y)
  return [x,y]
}
//will translate the "a1" to [1,1] etc
