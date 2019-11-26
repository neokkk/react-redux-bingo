import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';
import Board from '../components/Board';

import { startGame, reset, endGame } from '../store/modules/bingo';

/* 배열 셔플 함수 */
const shuppleArr = arr => {
  const newArr = arr.slice(); // 배열 복사

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
  const bingoPlayer = useSelector(state => state.bingo.bingoPlayer);
  const count = useSelector(state => state.bingo.count);
  const [bingoArr1, setBingoArr1] = useState(Array(25).fill(0).map((v, i) => i + 1)); // 랜덤 배열 1
  const [bingoArr2, setBingoArr2] = useState(Array(25).fill(0).map((v, i) => i + 1)); // 랜덤 배열 2

  /* 게임 시작 버튼 */
  const handleGameStart = () => {
    setBingoArr1(shuppleArr(bingoArr1));
    setBingoArr2(shuppleArr(bingoArr2));

    dispatch(reset()); // 시작 전 초기화
    dispatch(startGame()); // 게임 시작
  }

  /* 무승부 검증 */
  if (bingoPlayer.length === 2) {
      alert('빙고! 무승부입니다.'); 
      dispatch(endGame()); // 초기화
  } else if (bingoPlayer.length === 1) {
      alert(`빙고! player${bingoPlayer[0]}의 승리입니다.`);
      dispatch(endGame()); // 초기화
  }

  return (
    <div className='App'>
      <header>
        <button onClick={handleGameStart}>{isStarted ? '게임 재시작' : '게임 시작'}</button>
        <button>{isStarted && `player${count % 2 === 0 ? 1 : 2}의 차례입니다.`}</button>
      </header>
      <main>
        <Board array={bingoArr1} player={1} />
        <Board array={bingoArr2} player={2} />
      </main>
    </div>
  );
};

export default App;