import * as React from 'react';
// import Cell from './Cell';
import Box from './Box';
import './Board.css';

import sku from './sudoku';

interface BoardProps {
    seed: string;
    onClick: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
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

    render() {
        var rows = [];
        for (var i = 0; i < 3; ++i) {
            var boxes = [];
            for (var j = 0; j < 3; ++j) {
                boxes.push(
                    <Box
                        onClick = {this.props.onClick}
                        values = {sku.getSquare(this.state.values, j, i)}
                        style = {{
                            backgroundColor: ((i * 3 + j) % 2 === 0) ?
                                '#d1c4e9' : 'white'}}
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
