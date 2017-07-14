import * as React from 'react';
import NumberButton from './NumberButton';

import { connect } from 'react-redux';
import { enterNum, SudokuState } from './reduxFns';

interface NumberPadProps {
    onClick?: Function;
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

        return (
            <div className = "numPad">
                {numPadRows}
            </div>
        );
    }
}

const mapStateToProps = (state: Function) => {
    return {};
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        onClick: (val: number) => {
            dispatch(enterNum(val));
        }
    };
};

const NumberPadWrap = connect<SudokuState, {}, NumberPadProps>(
    mapStateToProps,
    mapDispatchToProps
)(NumberPad);

export default NumberPadWrap;
