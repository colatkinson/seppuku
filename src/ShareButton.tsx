import * as React from 'react';
import { Button } from 'semantic-ui-react';
import * as CopyToClipboard from 'react-copy-to-clipboard';

import Toast from './Toast';

import 'semantic-ui-css/semantic.min.css';
import './ShareButton.css';

interface ShareButtonState {
    timer: number;
    showToast: boolean;
}

class ShareButton extends React.Component<{}, ShareButtonState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            timer: 0,
            showToast: false
        };
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    onCopy() {
        clearInterval(this.state.timer);
        this.setState(Object.assign({}, this.state, {
            showToast: true,
            timer: window.setTimeout(
                () => {
                    this.setState(
                        Object.assign({}, this.state, {
                            showToast: false
                        })
                    );
                },
                2000)
        }));
    }

    render() {
        return (
            <div>
                <CopyToClipboard text = {window.location.href} onCopy = {() => this.onCopy()}>
                    <Button className = "sharingBtn icon" color = "violet" size = "huge" icon = "share alternate" />
                </CopyToClipboard>
                <Toast show = {this.state.showToast}>
                    Link copied to clipboard
                </Toast>
            </div>
        );
    }
}

export default ShareButton;
