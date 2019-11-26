import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Board.scss';
import BoardCell from './BoardCell';

import { endGame } from '../store/modules/bingo';

/* 빙고 인덱스 배열 */
const bingoArr = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20]
];

const Board = ({ array, player }) => {
    const dispatch = useDispatch();
    const clickedCell = useSelector(state => state.bingo.clickedCell);
    const [clickedIndexArr, setClickedIndexArr] = useState([]); // 클릭한 숫자의 인덱스 담는 배열

    useEffect(() => {
        if (!clickedCell.length) { // 재시작하면 인덱스 배열 초기화
            setClickedIndexArr([]);
        }

        clickedCell.forEach(v1 => {
            setClickedIndexArr(clickedIndexArr.concat(array.findIndex(v2 => v2 === v1))); // 인덱스 추가
        });
    }, [clickedCell]);

    /* 빙고 검증 */
    if (clickedIndexArr.length > 4) { // 클릭한 수가 5개 이상일 때
        bingoArr.forEach(v1 => {
            const mapped = v1.map(v2 => { // 클릭한 수의 인덱스 배열이 빙고 배열과 일치할 경우
                if (clickedIndexArr.indexOf(v2) >= 0) {
                    return 0;
                }
            });

            if (!mapped.filter(v => v !== 0).length) { // 빙고!
                dispatch(endGame(player)); // 빙고를 외친 플레이어 추가
                setClickedIndexArr([]); // 인덱스 배열 초기화
            }
        });
    }

    return (
        <div className='Board'>
            <p>{player}P</p>
            <div className='Board-cells'>
                {array.map((v, i) =>
                    <BoardCell key={i} num={v} player={player} isClicked={(clickedCell.length && (clickedCell.indexOf(v) >= 0)) ? true : false} />
                )}
            </div>
        </div>
    );
};

export default Board;