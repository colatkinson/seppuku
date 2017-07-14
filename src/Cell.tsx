import * as React from 'react';

import './Cell.css';

interface CellProps {
    value: number;
    id: number;
    sel: boolean;
    orig: boolean;
    soln: number;
    onClick: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
    onKeyUp: React.EventHandler<React.KeyboardEvent<HTMLDivElement>>;
}

class Cell extends React.Component<CellProps, {}> {
    constructor(props: CellProps) {
        super(props);
    }

    render() {
        const invalid = this.props.value !== 0 && this.props.soln !== this.props.value;
        return (
            <div
                onClick = {this.props.onClick}
                onKeyUp = {this.props.onKeyUp}
                className = {'skuCell' +
                             (this.props.sel ? ' sel' : '') +
                             (this.props.orig ? ' orig' : '') +
                             (invalid ? ' invalid' : '')}
                id = {'' + this.props.id}
            >
                {(this.props.value === 0) ? '' : this.props.value}
            </div>
        );
    }
}

export default Cell;
