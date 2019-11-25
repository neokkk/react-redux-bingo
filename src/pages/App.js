import React from 'react';
import './App.scss';
import Board from '../components/Board';

const App = () => {
  return (
    <div className='App'>
      <button>게임 시작</button>
      <section>
        <Board />
        <Board />
      </section>
    </div>
  );
};

export default App;