import * as React from 'react';
// import Cell from './Cell';
import Box from './Box';
import './Board.css';

import sku from './sudoku';

import { connect } from 'react-redux';
import { genBoard, selectCell, SudokuState } from './reduxFns';

interface BoardProps {
    seed: string;
    onCellClicked?: Function;
    onBoardGen?: Function;
    selectedIndex?: number;
    curBoard?: number[];
    origBoard?: number[];
    solnBoard?: number[];
    curNotes?: boolean[][];
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
        alert(e);
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
            <div className = "skuBoard" onKeyUp = {e => this.keyUp(e)}>
                <h1
                    style = {
                        {display: ((typeof this.props.curBoard !== 'undefined') &&
                                    sku.isComplete(this.props.curBoard))
                                  ? 'block'
                                  : 'none'}}
                >
                    You won!
                </h1>
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
        curNotes: state.curNotes
    };
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        onBoardGen: (board: number[], soln: number[]) => {
            dispatch(genBoard(board, soln));
        },
        onCellClicked: (index: number) => {
            dispatch(selectCell(index));
        }
    };
};

const BoardWrap = connect<SudokuState, {}, BoardProps>(
    mapStateToProps,
    mapDispatchToProps
)(Board);

export default BoardWrap;
