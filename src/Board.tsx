import * as React from 'react';
// import Cell from './Cell';
import Box from './Box';
import './Board.css';

import sku from './sudoku';

interface BoardProps {
    seed: string;
}

interface BoardState {
    values: number[];
}

class Board extends React.Component<BoardProps, BoardState> {
    constructor(props: BoardProps) {
        super(props);

        this.state = {
            values: sku.genSolnFromSeed(props.seed)
        };

        // console.log(this.state);
    }

    render() {
        var rows = [];
        for (var i = 0; i < 3; ++i) {
            var boxes = [];
            for (var j = 0; j < 3; ++j) {
                boxes.push(
                    <Box
                        values = {sku.getSquare(this.state.values, j, i)}
                        style = {{
                            backgroundColor: ((i * 3 + j) % 2 === 0) ?
                                '#c0ffee' : 'white'}}
                    />
                );
            }
            rows.push(
                <div className = "skuBoardRow">
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

export default Board;
