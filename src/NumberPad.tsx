import * as React from 'react';
import NumberButton from './NumberButton';

import { connect } from 'react-redux';
import { enterNum, setNoteMode, SudokuState } from './reduxFns';

import './NumberPad.css';

interface NumberPadProps {
    onClick?: Function;
    setNoteMode?: Function;
    noteMode?: boolean;
}

class NumberPad extends React.Component<NumberPadProps, {}> {
    render() {
        const numPadRows = [];
        for (var i = 1; i <= 9; i += 3) {
            const numButtons = [];
            for (var digit = i; digit < i + 3; ++digit) {
                numButtons.push(
                    <NumberButton value = {digit} onClick = {this.props.onClick} key = {digit} />
                );
            }
            numPadRows.push(
                <div className = "numPadRow" key = {i}>
                    {numButtons}
                </div>
            );
        }

        numPadRows.push(
            <div className = "numPadRow" key = {0}>
                <NumberButton value = {0} onClick = {this.props.onClick} key = {0} />
            </div>
        );

        const newFn = () => {
            if (typeof this.props.setNoteMode !== 'undefined') {
                this.props.setNoteMode(!this.props.noteMode);
            }
        };

        return (
            <div className = "numPad">
                <NumberButton value = {!this.props.noteMode ? '\u270f' : '\u2711'} onClick = {newFn} />
                {numPadRows}
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
