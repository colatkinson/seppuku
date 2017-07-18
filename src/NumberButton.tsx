import * as React from 'react';
import { Button } from 'semantic-ui-react';

import './NumberButton.css';

interface NumberButtonProps {
    value: number | string;
    display?: string;
    onClick?: Function;
}

class NumberButton extends React.Component<NumberButtonProps, {}> {
    render() {
        return (
            <Button
                onClick = {_ => {
                    if (typeof this.props.onClick !== 'undefined') {
                        this.props.onClick(this.props.value);
                    }
                }}
            >
                {(typeof this.props.display === 'undefined') ? this.props.value : this.props.display}
            </Button>
        );
    }
}

export default NumberButton;
