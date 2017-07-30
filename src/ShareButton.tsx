import * as React from 'react';
import { Button } from 'semantic-ui-react';
import * as CopyToClipboard from 'react-copy-to-clipboard';

import 'semantic-ui-css/semantic.min.css';
import './ShareButton.css';

class ShareButton extends React.Component<{}, {}> {
    render() {
        return (
            <CopyToClipboard text = {window.location.href}>
                <Button className = "sharingBtn icon" color = "violet" size = "huge" icon = "share alternate" />
            </CopyToClipboard>
        );
    }
}

export default ShareButton;