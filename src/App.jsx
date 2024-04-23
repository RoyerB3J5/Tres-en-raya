import { useState } from 'react'
import './App.css'
import {turnos} from './constants.js'
import { comboWinners, checkEndGame } from './logica/Winner.js'

function App() {

  const [turn,setTurn]=useState(true)
  const [table,setTable] = useState(new Array(9).fill(null))
  const [clickedIndexes,setClickedIndexes] = useState(new Set())
  const[winner,setWinner]=useState(null)

  function upgrateTable(index){
    if (!clickedIndexes.has(index)){
      const valTurn = turn? turnos.circle : turnos.exis
      setTable(prevTable =>{
        const newTable = [...prevTable]
        newTable[index]=valTurn
        if(comboWinners(newTable)){
          setWinner(true)
        }else if (checkEndGame(newTable)){
          setWinner(false)
        }
        return newTable})
      
      
      setClickedIndexes(prevClickedIndexes => new Set(prevClickedIndexes).add(index))
      
      setTurn(!turn)
      
    }
  }

  function Board(){
    return table.map((_,index)=>{
      return <div className='square' key={index} onClick={()=>upgrateTable(index)}>
          <span>
            {table[index]}
          </span>
        </div>
      
    })
  }

  function restartGame(){
    setTurn(true)
    setTable(Array(9).fill(null))
    setClickedIndexes(new Set())
    setWinner(null)
  }

  function WinnerModal(){
    if (winner===null) return null

    const winnerText = winner === false? "Empate":"Gano"

    return(
      <section className='winner'>
          <div className='text'>
            <p >{winnerText}</p>
            <header className='win'>
              {winner && <div className='square'>{turn? "X" : "O"}</div> }
            </header>
            <footer>
              <button onClick={restartGame}>Reiniciar juego</button>
            </footer>
          </div>
          
      </section>
    )
  }

  return (
    <main className='board'>
      <h1>Tres en Raya</h1>
      <button onClick={restartGame}>Reiniciar juego</button>
      <section className='game'>
        <Board />
      </section>
      <section className='turn'>
        <div className={`square ${ turn ? 'is-selected' : ''}`}>
          {turnos.circle}
        </div>
        <div className={`square ${ !turn ? 'is-selected' : ''}`}>
          {turnos.exis}
        </div>
      </section>
      <WinnerModal/>
    </main>
  )
}

export default App
