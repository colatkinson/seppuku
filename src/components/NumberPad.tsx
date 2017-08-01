import * as React from 'react';
import NumberButton from './NumberButton';

import { connect } from 'react-redux';
import { enterNum, setNoteMode, SudokuState } from '../reduxFns';

import { Button } from 'semantic-ui-react';

import '../styles/NumberPad.css';

interface NumberPadProps {
    onClick?: Function;
    setNoteMode?: Function;
    noteMode?: boolean;
}

class NumberPad extends React.Component<NumberPadProps, {}> {
    render() {
        const newFn = () => {
            if (typeof this.props.setNoteMode !== 'undefined') {
                this.props.setNoteMode(!this.props.noteMode);
            }
        };

        // Initialize array with note/write mode toggle button
        const numButtons = [(
            <NumberButton value = "" onClick = {newFn} icon = {true} key = "write">
                <i className = {'icon ' + (this.props.noteMode ? 'edit' : 'write')} />
            </NumberButton>
        )];

        // Generate buttons for [1, 9]
        for (let digit = 1; digit <= 9; ++digit) {
            numButtons.push(
                <NumberButton value = {digit} onClick = {this.props.onClick} key = {digit}>
                    {digit}
                </NumberButton>
            );
        }

        // Append button for 0, with special styling indicating it clears the value
        numButtons.push(
            <NumberButton
                icon = {true}
                value = {0}
                onClick = {this.props.onClick}
                key = {0}
            >
                <i className = "window close icon" />
            </NumberButton>
        );

        // Create two num pads, one for horizontal layout and one for vertical
        return (
            <div className = "numPad">
                <Button.Group vertical = {true} className = "numPadVertical" key = "vert">
                    {numButtons}
                </Button.Group>
                <Button.Group vertical = {false} className = "numPadHorizontal" key = "horiz">
                    {numButtons}
                </Button.Group>
            </div>
        );
    }
}

const mapStateToProps = (state: SudokuState) => {
    return {
        noteMode: state.noteMode
    };
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        onClick: (val: number) => {
            dispatch(enterNum(val));
        },
        setNoteMode: (val: boolean) => {
            dispatch(setNoteMode(val));
        }
    };
};

const NumberPadWrap = connect<SudokuState, {}, NumberPadProps>(
    mapStateToProps,
    mapDispatchToProps
)(NumberPad);

export default NumberPadWrap;
