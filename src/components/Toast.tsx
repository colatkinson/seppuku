import * as React from 'react';

interface ToastProps {
    show: boolean;
    children: string | JSX.Element;
}

import '../styles/Toast.css';

class Toast extends React.Component<ToastProps, {}> {
    render() {
        return (
            <div className = {'Toast' + (!this.props.show ? ' hide' : '')}>
                {this.props.children}
            </div>
        );
    }
}

export default Toast;
