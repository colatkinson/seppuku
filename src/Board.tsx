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

        var rows = [];
        for (var i = 0; i < 3; ++i) {
            var boxes = [];
            for (var j = 0; j < 3; ++j) {
                boxes.push(
                    <Box
                        selectedIndex = {this.props.selectedIndex}
                        key = {i * 3 + j}
                        onClick = {e => this.cellClick(e)}
                        onKeyUp = {e => this.keyUp(e)}
                        values = {sku.getSquare(vals, j, i)}
                        origValues = {sku.getSquare(origVals, j, i)}
                        solns = {sku.getSquare(solnVals, j, i)}
                        ids = {sku.getSquare(boardIds, j, i)}
                        style = {{
                            backgroundColor: ((i * 3 + j) % 2 === 0) ?
                                '#d1c4e9' : 'white'}}
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
        solnBoard: state.soln
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
