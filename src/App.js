import { useEffect, useState } from 'react';
import './App.css';
import { PLAYER1, PLAYER2, WINNING_COMBINATION } from './constant';

function App() {
  const [values, setValues] = useState(Array(9).fill(null));
  const [wordsIndex, setWordsIndex] = useState(0);
  const [winMessage, setWinMessage] = useState('');
  const [winningIndices, setWinningIndices] = useState([]);

  const words = Array(10).fill(null);
  PLAYER1.forEach((word, index) => {
    words[index * 2] = word;
  });
  PLAYER2.forEach((word, index) => {
    words[index * 2 + 1] = word;
  });

  useEffect(() => {
    checkWinner();
  }, [values])

  const checkWinner = () => {
    WINNING_COMBINATION.forEach(aCombination => {
      const [i1, i2, i3] = aCombination;
      if (values[i1] && values[i2] && values[i3] && values[i1][0] === values[i2][0] && values[i1][0] === values[i3][0]) {
        if (values[i1][0] === PLAYER1[0][0]) {
          setWinMessage('Player 1 wins the match');
        }
        else {
          setWinMessage('Player 2 wins the match');
        }
        setWinningIndices(aCombination);
      }
    })
    if (!winMessage && values.every(value => value)) {
      setWinMessage('No player wins');
    }
  }

  const handleClickBox = (index) => {
    if (!values[index]) {
      const temp = [...values];
      temp[index] = words[wordsIndex];
      setWordsIndex(wordsIndex + 1);
      setValues(temp);
    }
  }

  const playAgain = () => {
    setValues(Array(9).fill(null));
    setWordsIndex(0);
    setWinMessage('');
    setWinningIndices([]);
  }

  return (
    <div className='container'>
      <div className={`game-container bg-container ${winMessage ? 'disable' : ''}`}>
        {values?.map((aValue, index) => (
          <div key={index}
            className={`square-item f30 p20 flex flex-align-center flex-justify-center ${winningIndices.includes(index) ? 'won' : ''} ${aValue && aValue[0] === PLAYER1[0][0] ? 'red-text' : 'blue-text'}`}
            onClick={() => handleClickBox(index)}>{aValue}</div>
        ))}
      </div>
      <div className='bottom-container'>
        {winMessage ? (
          <>
            <div className='flex flex-align-center'>
              <span className='m20 bold'>{winMessage}</span>
              <button onClick={playAgain}>Play Again</button>
            </div>
          </>
        ) : (
          <>
            <div className='flex flex-align-center m10 p20'>
              <span className='bold'>Player 1: </span>
              {PLAYER1?.map((word, index) => (<div key={index} className='square-item m5 p10 flex red-text'>{word}</div>))}
            </div>
            <div className='flex flex-align-center m10 p20'>
              <span className='bold'>Player 2: </span>
              {PLAYER2?.map((word, index) => (<div key={index} className='square-item m5 p10 flex blue-text'>{word}</div>))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
