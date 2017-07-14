import * as React from 'react';
import Note from './Note';

import './NoteBox.css';

interface NoteBoxProps {
    values: boolean[];
}

class NoteBox extends React.Component<NoteBoxProps, {}> {
    constructor(props: NoteBoxProps) {
        super(props);
    }

    render() {
        var rows = [];
        for (var i = 0; i < 3; ++i) {
            var cells = [];
            for (var j = 0; j < 3; ++j) {
                cells.push(
                    <Note
                        value = {i * 3 + j + 1}
                        display = {this.props.values[i * 3 + j]}
                        key = {i * 3 + j + 1}
                    />
                );
            }
            rows.push(
                <div className = "skuNoteBoxRow" key = {i}>
                    {cells}
                </div>
            );
        }
        return (
            <div className = "skuNoteBox">
                {rows}
            </div>
        );
    }
}

export default NoteBox;
