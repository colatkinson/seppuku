import * as React from 'react';
import { Button } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './ShareButton.css';

class ShareButton extends React.Component<{}, {}> {
    render() {
        return (
            <Button className = "sharingBtn icon" color = "violet" size = "huge" icon = "share alternate" />
        );
    }
}

export default ShareButton;