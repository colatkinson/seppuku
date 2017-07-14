import { GEN_BOARD, SELECT_CELL } from './actionTypes';

function genBoard(board: number[], soln: number[]) {
    return {
        type: GEN_BOARD,
        board: board,
        soln: soln
    };
}

function selectCell(index: number) {
    return {
        type: SELECT_CELL,
        selectedIndex: index
    };
}

// function enterNum(value: number) {
//     return {
//         type: ENTER_NUM,
//         value: value
//     };
// }

interface SudokuAction {
    type: string;
    selectedIndex?: number;
    board?: number[];
    soln?: number[];
}

interface SudokuState {
    selectedIndex?: number;
    origBoard?: number[];
    soln?: number[];
    curBoard?: number[];
}

const initialState: SudokuState = {
    selectedIndex: undefined,
    origBoard: undefined,
    soln: undefined,
    curBoard: undefined
};

function sudokuApp(state: SudokuState = initialState, action: SudokuAction) {
    switch (action.type) {
        case GEN_BOARD:
            return Object.assign({}, state, {
                origBoard: action.board,
                curBoard: action.board,
                soln: action.soln
            });
        case SELECT_CELL:
            var newInd = action.selectedIndex;
            if (state.selectedIndex === newInd) {
                newInd = undefined;
            }
            return Object.assign({}, state, {
                selectedIndex: newInd
            });
        default:
            return state;
    }
}

export {
    genBoard,
    selectCell,
    sudokuApp,
    SudokuState
};
