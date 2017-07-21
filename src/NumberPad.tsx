import * as React from 'react';
import NumberButton from './NumberButton';

import { connect } from 'react-redux';
import { enterNum, setNoteMode, SudokuState } from './reduxFns';

import { Button } from 'semantic-ui-react';

import './NumberPad.css';

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

        const numButtons = [(
            <NumberButton value = "" onClick = {newFn} icon = {true}>
                <i className = {'icon ' + (this.props.noteMode ? 'edit' : 'write')} />
            </NumberButton>
        )];
        for (let digit = 1; digit <= 9; ++digit) {
            numButtons.push(
                <NumberButton value = {digit} onClick = {this.props.onClick} key = {digit}>
                    {digit}
                </NumberButton>
            );
        }

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
