import React from 'react';

import './Board.scss';
import BoardCell from './BoardCell';

const Board = () => {
    return (
        <div className='Board'>
            <p>1P</p>
            <div className='Board-cells'>
                {Array(25).fill(0).map(() =>
                    <BoardCell />
                )}
            </div>
        </div>
    );
};

export default Board;