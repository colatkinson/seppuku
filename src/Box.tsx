import * as React from 'react';
import Cell from './Cell';

import './Box.css';

interface BoxProps {
    values: number[];
    ids: number[];
    selectedIndex?: number;
    style: Object;
    onClick: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
}

class Box extends React.Component<BoxProps, {}> {
    constructor(props: BoxProps) {
        super(props);
    }

    render() {
        var rows = [];
        for (var i = 0; i < 3; ++i) {
            var cells = [];
            for (var j = 0; j < 3; ++j) {
                cells.push(
                    <Cell
                        sel = {this.props.ids[i * 3 + j] === this.props.selectedIndex}
                        key = {i * 3 + j}
                        onClick = {this.props.onClick}
                        value = {this.props.values[i * 3 + j]}
                        id = {this.props.ids[i * 3 + j]}
                    />
                );
            }
            rows.push(
                <div className = "skuBoxRow" key = {i}>
                    {cells}
                </div>
            );
        }
        return (
            <div className = "skuBox" style = {this.props.style}>
                {rows}
            </div>
        );
    }
}

export default Box;
