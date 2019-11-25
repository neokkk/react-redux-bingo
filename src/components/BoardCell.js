import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './BoardCell.scss';

import { countPlay, clickCell } from '../store/modules/bingo';

const BoardCell = ({ num, player, isClicked }) => {
    const dispatch = useDispatch();
    const isStarted = useSelector(state => state.bingo.isStarted);
    const count = useSelector(state => state.bingo.count);
    const clickedCell = useSelector(state => state.bingo.clickedCell);

    const handleClick = e => {
        if (isStarted) { // 게임 시작을 누른 이후
            const c = Number(e.currentTarget.innerText); // 클릭한 숫자
            console.log('clicked : ', c);

            if (clickedCell.indexOf(c) < 0) { // 기존에 클릭한 숫자가 아닐 경우
                if (count % 2 === player - 1) { // 자기 차례
                    dispatch(countPlay());
                    dispatch(clickCell(c));
                } else {
                    alert('잘못된 차례입니다.');
                }
            }
        }
    }

    return (
        <div className={`BoardCell item ${isClicked ? 'clicked' : null}`} onClick={handleClick}>
            {isStarted && num}
        </div>
    );
};

export default BoardCell;