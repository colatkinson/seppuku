import * as React from 'react';

import './NumberButton.css';

interface NumberButtonProps {
    value: number;
    onClick: Function;
}

class NumberButton extends React.Component<NumberButtonProps, {}> {
    render() {
        return (
            <div className = "numButton" onClick = {_ => this.props.onClick(this.props.value)}>
                {this.props.value}
            </div>
        );
    }
}

export default NumberButton;
