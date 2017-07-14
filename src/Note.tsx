import * as React from 'react';

import './Note.css';

interface NoteProps {
    value: number;
    display: boolean;
}

class Note extends React.Component<NoteProps, {}> {
    constructor(props: NoteProps) {
        super(props);
    }

    render() {
        return (
            <div
                className = "skuNote"
            >
                {(this.props.display) ? this.props.value : ''}
            </div>
        );
    }
}

export default Note;
