import * as React from 'react';

import './Cell.css';

interface CellProps {
    value: number;
    id: number;
}

class Cell extends React.Component<CellProps, {}> {
    constructor(props: CellProps) {
        super(props);
    }

    render() {
        return (
            <div
                className = "skuCell"
                id = {'cell' + this.props.id}
            >
                {this.props.value}
            </div>
        );
    }
}

export default Cell;
