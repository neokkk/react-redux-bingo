import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';
import Board from '../components/Board';

import { startGame, reset } from '../store/modules/bingo';

/* 배열 셔플 함수 */
const shuppleArr = arr => {
  const newArr = arr.slice();

  for (let i = 0; i < newArr.length; i++) {
    const randomIndex = Math.floor(Math.random() * newArr.length);

    // swap
    let tmp = newArr[i];
    newArr[i] = newArr[randomIndex];
    newArr[randomIndex] = tmp;
  }

  return newArr;
}

const App = () => {
  const dispatch = useDispatch();
  const isStarted = useSelector(state => state.bingo.isStarted);
  const count = useSelector(state => state.bingo.count);

  const [bingoArr1, setBingoArr1] = useState(Array(25).fill(0).map((v, i) => i + 1));
  const [bingoArr2, setBingoArr2] = useState(Array(25).fill(0).map((v, i) => i + 1));

  const handleGameStart = () => {
    setBingoArr1(shuppleArr(bingoArr1));
    setBingoArr2(shuppleArr(bingoArr2));

    dispatch(reset());
    dispatch(startGame());
  }

  return (
    <div className='App'>
      <header>
        <button onClick={handleGameStart}>{isStarted ? '게임 재시작' : '게임 시작'}</button>
        <button>{isStarted && `player${count % 2 === 0 ? 1 : 2} 의 차례입니다.`}</button>
      </header>
      <section>
        <Board array={bingoArr1} player={1} />
        <Board array={bingoArr2} player={2} />
      </section>
    </div>
  );
};

export default App;