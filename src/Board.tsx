import * as React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import * as shortid from 'shortid';
import Box from './Box';
import './Board.css';

import sku from './sudoku';

import { connect } from 'react-redux';
import {
    genBoard,
    selectCell,
    enterNum,
    setNoteMode,
    SudokuState
} from './reduxFns';

interface BoardProps {
    seed: string;
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
}

class Board extends React.Component<BoardProps, {}> {
    constructor(props: BoardProps) {
        super(props);

        const soln = sku.genSolnFromSeed(props.seed);

        if (typeof props.onBoardGen === 'undefined') {
            return;
        }
        props.onBoardGen(sku.genFromSolved(soln), soln);
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
                        style = {{
                            backgroundColor: ((i * 3 + j) % 2 === 0) ?
                                '#d9c7ff' : 'white'}}
                    />
                );
            }
            rows.push(
                <div className = "skuBoardRow" key = {i}>
                    {boxes}
                </div>
            );
        }
        return (
            <div className = "skuBoard" onKeyUp = {e => this.keyUp(e)} tabIndex = {1}>
                <h1
                    style = {
                        {display: ((typeof this.props.curBoard !== 'undefined') &&
                                    sku.isComplete(this.props.curBoard))
                                  ? 'block'
                                  : 'none'}}
                >
                    You won!
                </h1>
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
        noteMode: state.noteMode
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
        }
    };
};

const BoardWrap = connect<SudokuState, {}, BoardProps>(
    mapStateToProps,
    mapDispatchToProps
)(Board);

export default BoardWrap;
