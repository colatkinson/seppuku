import * as React from 'react';

import './Cell.css';

interface CellProps {
    value: number;
    id: number;
    sel: boolean;
    onClick: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
}

class Cell extends React.Component<CellProps, {}> {
    constructor(props: CellProps) {
        super(props);
    }

    render() {
        return (
            <div
                onClick = {this.props.onClick}
                className = {'skuCell' + (this.props.sel ? ' sel' : '')}
                id = {'' + this.props.id}
            >
                {(this.props.value === 0) ? '' : this.props.value}
            </div>
        );
    }
}

export default Cell;
