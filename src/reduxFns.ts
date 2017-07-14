import { SELECT_CELL } from './actionTypes';

function selectCell(index: number) {
    return {
        type: SELECT_CELL,
        selectedIndex: index
    };
}

interface SudokuAction {
    type: string;
    selectedIndex?: number;
}

interface SudokuState {
    selectedIndex?: number;
}

const initialState: SudokuState = {
    selectedIndex: undefined
};

function sudokuApp(state: SudokuState = initialState, action: SudokuAction) {
    switch (action.type) {
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
    selectCell,
    sudokuApp,
    SudokuState
};
