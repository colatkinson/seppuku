import { GEN_BOARD, SELECT_CELL, ENTER_NUM, SET_NOTE_MODE } from './actionTypes';

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

function enterNum(value: number) {
    return {
        type: ENTER_NUM,
        value: value
    };
}

function setNoteMode(noteMode: boolean) {
    return {
        type: SET_NOTE_MODE,
        noteMode: noteMode
    };
}

interface SudokuAction {
    type: string;
    selectedIndex?: number;
    board?: number[];
    soln?: number[];
    value?: number;
    noteMode?: boolean;
}

interface SudokuState {
    selectedIndex?: number;
    origBoard?: number[];
    soln?: number[];
    curBoard?: number[];
    noteMode?: boolean;
    curNotes?: boolean[][];
}

const falseArr = [];
for (var i = 0; i < 9; ++i) {
    falseArr.push(false);
}

const initNotes = [];
for (var j = 0; j < 81; ++j) {
    initNotes.push(falseArr.slice());
}

const initialState: SudokuState = {
    selectedIndex: undefined,
    origBoard: undefined,
    soln: undefined,
    curBoard: undefined,
    noteMode: false,
    curNotes: initNotes
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
        case ENTER_NUM:
            if (typeof state.curBoard === 'undefined' ||
                typeof state.origBoard === 'undefined' ||
                typeof state.selectedIndex === 'undefined' ||
                typeof action.value === 'undefined' ||
                typeof state.curNotes === 'undefined') {
                return state;
            }
            if (state.origBoard[state.selectedIndex] !== 0) {
                return state;
            }

            if (!state.noteMode) {
                const newBoard = state.curBoard.slice();
                newBoard[state.selectedIndex] = action.value;
                return Object.assign({}, state, {
                    curBoard: newBoard
                });
            } else {
                if (action.value === 0) {
                    return state;
                }

                const newNotesArr = state.curNotes.slice();
                const newCellNotes = newNotesArr[state.selectedIndex].slice();
                newCellNotes[action.value - 1] = !newCellNotes[action.value - 1];

                newNotesArr[state.selectedIndex] = newCellNotes;

                return Object.assign({}, state, {
                    curNotes: newNotesArr
                });
            }
        case SET_NOTE_MODE:
            return Object.assign({}, state, {
                noteMode: action.noteMode
            });
        default:
            return state;
    }
}

export {
    genBoard,
    selectCell,
    enterNum,
    setNoteMode,
    sudokuApp,
    SudokuState
};
