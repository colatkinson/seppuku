import * as React from 'react';
// import Cell from './Cell';
import Box from './Box';
import './Board.css';

import sku from './sudoku';

import { connect } from 'react-redux';
import { selectCell, SudokuState } from './reduxFns';

interface BoardProps {
    seed: string;
    onCellClicked?: Function;
    selectedIndex?: number;
}

interface BoardState {
    soln: number[];
    values: number[];
}

class Board extends React.Component<BoardProps, BoardState> {
    constructor(props: BoardProps) {
        super(props);

        const soln = sku.genSolnFromSeed(props.seed);

        this.state = {
            soln: soln,
            values: sku.genFromSolved(soln)
        };

        // console.log(this.state);
    }

    cellClick(e: React.MouseEvent<HTMLDivElement>) {
        if (typeof this.props.onCellClicked === 'undefined') {
            return;
        }

        this.props.onCellClicked(Number.parseInt(e.currentTarget.id));
    }

    render() {
        const boardIds = [];
        for (var k = 0; k < 81; ++k) {
            boardIds.push(k);
        }

        var rows = [];
        for (var i = 0; i < 3; ++i) {
            var boxes = [];
            for (var j = 0; j < 3; ++j) {
                boxes.push(
                    <Box
                        selectedIndex = {this.props.selectedIndex}
                        key = {i * 3 + j}
                        onClick = {e => this.cellClick(e)}
                        values = {sku.getSquare(this.state.values, j, i)}
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
            <div className = "skuBoard">
                {rows}
            </div>
        );
    }
}

const mapStateToProps = (state: SudokuState) => {
    return {
        selectedIndex: state.selectedIndex
    };
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
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
