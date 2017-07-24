import * as React from 'react';

import './Cell.css';

import NoteBox from './NoteBox';

interface CellProps {
    value: number;
    id: number;
    sel: boolean;
    orig: boolean;
    soln: number;
    notes: boolean[];
    onClick: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
    onKeyUp: React.EventHandler<React.KeyboardEvent<HTMLDivElement>>;
}

class Cell extends React.Component<CellProps, {}> {
    constructor(props: CellProps) {
        super(props);
    }

    render() {
        const invalid = this.props.value !== 0 && this.props.soln !== this.props.value;
        var content = (<span>{this.props.value}</span>);
        if (this.props.value === 0) {
            if (this.props.notes.every((element) => (element === false))) {
                content = (<span>{'\u00A0'}</span>);
            } else {
                content = (
                    <NoteBox values = {this.props.notes} />
                );
            }
        }
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
                {content}
            </div>
        );
    }
}

export default Cell;
