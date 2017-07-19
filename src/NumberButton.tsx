import * as React from 'react';
import { Button } from 'semantic-ui-react';

import './NumberButton.css';
import 'semantic-ui-css/semantic.min.css';

interface NumberButtonProps {
    value: number | string;
    display?: Element;
    onClick?: Function;
    icon?: boolean;
}

class NumberButton extends React.Component<NumberButtonProps, {}> {
    render() {
        return (
            <Button
                className = {this.props.icon ? 'icon' : ''}
                onClick = {_ => {
                    if (typeof this.props.onClick !== 'undefined') {
                        this.props.onClick(this.props.value);
                    }
                }}
            >
                {this.props.children}
            </Button>
        );
    }
}

export default NumberButton;
