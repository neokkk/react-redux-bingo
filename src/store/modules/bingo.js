/* 액션 생성 함수 */
const START_GAME = 'bingo/START_GAME';
const COUNT_PLAY = 'bingo/COUNT_PLAY';
const RESET = 'bingo/RESET';
const CLICK_CELL = 'bingo/CLICK_CELL';
const END_GAME = 'bingo/END_GAME'

/* 액션 정의 */
export const startGame = () => ({ type: START_GAME });
export const countPlay = () => ({ type: COUNT_PLAY });
export const reset = () => ({ type: RESET })
export const clickCell = cell => ({ type: CLICK_CELL, cell });
export const endGame = player => ({ type: END_GAME, player });

/* 초기 상태 설정 */
const initialState = {
    isStarted: false,
    count: 0,
    clickedCell: [],
    bingoPlayer: []
}

/* 리듀서 정의 */
export default function bingo(state = initialState, action) {
    switch(action.type) {
        case START_GAME:
            return {
                ...state,
                isStarted: true
            };
        case COUNT_PLAY:
            return {
                ...state,
                count: state.count + 1
            }
        case RESET:
            return {
                ...state,
                count: 0,
                clickedCell: []
            }
        case CLICK_CELL:
            return {
                ...state,
                clickedCell: [...state.clickedCell, action.cell]
            }
        case END_GAME:
            return {
                ...state,
                isStarted: false,
                count: 0,
                clickedCell: [],
                bingoPlayer: action.player ? [...state.bingoPlayer, action.player] : []
            }
        default:
            return state;
    }
}