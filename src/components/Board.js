import React from 'react';
import { useSelector } from 'react-redux';

import './Board.scss';
import BoardCell from './BoardCell';

const Board = ({ array, player }) => {
    const clickedCells = useSelector(state => state.bingo.clickedCell);

    return (
        <div className='Board'>
            <p>{player}P</p>
            <div className='Board-cells'>
                {array.map((v, i) =>
                    <BoardCell key={i} num={v} player={player} isClicked={(clickedCells.length && (clickedCells.indexOf(v) >= 0)) ? true : false} />
                )}
            </div>
        </div>
    );
};

export default Board;