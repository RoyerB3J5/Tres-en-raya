import { numbersWinners } from "../constants";
export function comboWinners(tables){
  for(let combo of numbersWinners){
    const [a,b,c]=combo;
    if(tables[a]!== null && tables[b]!== null&& tables[c] !== null){
      if(tables[a] === tables[b] && tables[b] === tables[c] && tables[a] === tables[c] ){
        return true
      }
    } 
  }
  return null
}

export function checkEndGame(tables){
  return tables.every(p => p!==null)
}
