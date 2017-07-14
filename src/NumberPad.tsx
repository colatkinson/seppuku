import * as React from 'react';
import NumberButton from './NumberButton';

interface NumberPadProps {
    onClick: Function;
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

export default NumberPad;
