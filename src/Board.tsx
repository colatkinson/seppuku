import * as React from 'react';
import { Button, Header, Modal, Dimmer, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import * as shortid from 'shortid';
import Box from './Box';
import './Board.css';

import sku from './sudoku';

import { connect } from 'react-redux';
import {
    startGenBoard,
    genBoard,
    selectCell,
    enterNum,
    setNoteMode,
    SudokuState
} from './reduxFns';

interface BoardProps {
    seed: string;
    diff: string;
    onCellClicked?: Function;
    onBoardGen?: Function;
    selectedIndex?: number;
    curBoard?: number[];
    origBoard?: number[];
    solnBoard?: number[];
    curNotes?: boolean[][];
    setNoteMode?: Function;
    noteMode?: boolean;
    onNumber?: Function;
    lastNums?: number[];
    onStartBoardGen?: Function;
    generatingBoard?: boolean;
}

const isSameArr = (arr1: number[], arr2: number[]) => (
    (arr1.length === arr2.length) &&
    arr1.every((elem, index) => elem === arr2[index])
);

const jennyModal = (
    <Modal basic = {true} size = "small" defaultOpen = {true} className = "secret">
        <Header icon = "heart" content = "Jenny!" />
        <Modal.Content>
            <p>Shouts out Lauren for introducing me to the musical genius of Tommy Tutone!</p>
            <blockquote>
                <p>Jenny, I got your number</p>
                <p>I need to make you mine</p>
                <p>Jenny, don't change your number</p>
                <p>867-5309</p>
            </blockquote>
        </Modal.Content>
    </Modal>
);

class Board extends React.Component<BoardProps, {}> {
    constructor(props: BoardProps) {
        super(props);

        if (this.props.onStartBoardGen) {
            this.props.onStartBoardGen();
        }
    }

    componentDidMount() {
        window.setTimeout(
            () => {
                const soln = sku.genSolnFromSeed(this.props.seed);

                if (typeof this.props.onBoardGen === 'undefined') {
                    return;
                }

                let genFn = null;

                if (this.props.diff === 'easy') {
                    genFn = sku.genFromSolvedMedium;
                } else if (this.props.diff === 'med') {
                    genFn = sku.genFromSolvedHard;
                } else if (this.props.diff === 'hard') {
                    genFn = sku.genFromSolvedEvil;
                }

                if (genFn === null) {
                    return;
                }

                this.props.onBoardGen(genFn(soln), soln);
            },
            0
        );
    }

    cellClick(e: React.MouseEvent<HTMLDivElement>) {
        if (typeof this.props.onCellClicked === 'undefined') {
            return;
        }

        this.props.onCellClicked(Number.parseInt(e.currentTarget.id));
    }

    keyUp(e: React.KeyboardEvent<HTMLDivElement>) {
        if (!this.props.setNoteMode || typeof this.props.noteMode === 'undefined' ||
            !this.props.onNumber ||
            !this.props.onCellClicked || typeof this.props.selectedIndex === 'undefined') {
            return;
        }

        const numVal = Number.parseInt(e.key);
        if (e.key === 'Shift') {
            this.props.setNoteMode(!this.props.noteMode);
        } else if (e.key === 'Delete') {
            this.props.onNumber(0);
        } else if (!isNaN(numVal) && this.props.onNumber) {
            this.props.onNumber(numVal);
        } else if (e.key === 'ArrowUp') {
            let newInd = this.props.selectedIndex - 9;
            if (newInd < 0) {
                newInd += 81;
            }
            this.props.onCellClicked(newInd);
        } else if (e.key === 'ArrowDown') {
            let newInd = this.props.selectedIndex + 9;
            if (newInd > 80) {
                newInd -= 81;
            }
            this.props.onCellClicked(newInd);
        } else if (e.key === 'ArrowLeft') {
            let newInd = this.props.selectedIndex - 1;
            if ((newInd + 1) % 9 === 0) {
                newInd += 9;
            }
            this.props.onCellClicked(newInd);
        } else if (e.key === 'ArrowRight') {
            let newInd = this.props.selectedIndex + 1;
            if (newInd % 9 === 0) {
                newInd -= 9;
            }
            this.props.onCellClicked(newInd);
        }
    }

    render() {
        const boardIds = [];
        const zeros = [];
        for (var k = 0; k < 81; ++k) {
            boardIds.push(k);
            zeros.push(0);
        }

        const vals = (typeof this.props.curBoard === 'undefined')
                     ? zeros
                     : this.props.curBoard;

        const origVals = (typeof this.props.origBoard === 'undefined')
                         ? zeros
                         : this.props.origBoard;

        const solnVals = (typeof this.props.solnBoard === 'undefined')
                         ? zeros
                         : this.props.solnBoard;

        const falseArr = [];
        for (var a = 0; a < 9; ++a) {
            falseArr.push(false);
        }

        const initNotes = [];
        for (var b = 0; b < 81; ++b) {
            initNotes.push(falseArr.slice());
        }

        const notes = (typeof this.props.curNotes === 'undefined')
                      ? initNotes
                      : this.props.curNotes;

        var rows = [];
        for (var i = 0; i < 3; ++i) {
            var boxes = [];
            for (var j = 0; j < 3; ++j) {
                const idSquare = sku.getSquare(boardIds, j, i);

                const noteSquare = [];
                for (var m = 0; m < idSquare.length; ++m) {
                    noteSquare.push(notes[idSquare[m]]);
                }

                // c6abff

                boxes.push(
                    <Box
                        selectedIndex = {this.props.selectedIndex}
                        key = {i * 3 + j}
                        onClick = {e => this.cellClick(e)}
                        onKeyUp = {e => this.keyUp(e)}
                        values = {sku.getSquare(vals, j, i)}
                        origValues = {sku.getSquare(origVals, j, i)}
                        solns = {sku.getSquare(solnVals, j, i)}
                        ids = {idSquare}
                        notes = {noteSquare}
                    />
                );
            }
            rows.push(
                <div className = "skuBoardRow" key = {i}>
                    {boxes}
                </div>
            );
        }

        const modal = (typeof this.props.lastNums !== 'undefined') &&
                       isSameArr(this.props.lastNums, [8, 6, 7, 5, 3, 0, 9])
            ? jennyModal
            : <span />;

        return (
            <div className = "skuBoard" onKeyUp = {e => this.keyUp(e)} tabIndex = {1}>
                <Dimmer active = {this.props.generatingBoard}>
                    <Loader size = "massive">Loading</Loader>
                </Dimmer>
                <Modal
                    basic = {true}
                    size = "small"
                    open = {(typeof this.props.curBoard !== 'undefined') && sku.isComplete(this.props.curBoard)}
                >
                    <Header icon = "smile" content = "You won!" />
                    <Modal.Content>
                        <p>I bet you can't do the next one, though!</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Link to = {'/g/' + shortid.generate()}>
                            <Button color = "violet" inverted = {true}>
                                New Game
                            </Button>
                        </Link>
                    </Modal.Actions>
                </Modal>

                {modal}

                {rows}
            </div>
        );
    }
}

const mapStateToProps = (state: SudokuState) => {
    return {
        selectedIndex: state.selectedIndex,
        curBoard: state.curBoard,
        origBoard: state.origBoard,
        solnBoard: state.soln,
        curNotes: state.curNotes,
        noteMode: state.noteMode,
        lastNums: state.lastNums,
        generatingBoard: state.generatingBoard
    };
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        onBoardGen: (board: number[], soln: number[]) => {
            dispatch(genBoard(board, soln));
        },
        onCellClicked: (index: number) => {
            dispatch(selectCell(index));
        },
        onNumber: (val: number) => {
            dispatch(enterNum(val));
        },
        setNoteMode: (val: boolean) => {
            dispatch(setNoteMode(val));
        },
        onStartBoardGen: () => {
            dispatch(startGenBoard());
        }
    };
};

const BoardWrap = connect<SudokuState, {}, BoardProps>(
    mapStateToProps,
    mapDispatchToProps
)(Board);

export default BoardWrap;
