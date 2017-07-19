import * as React from 'react';
import './Header.css';

import { Button } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

class Header extends React.Component<{}, {}> {
  render() {
    return (
        <div className = "Header">
            <Button className = "icon">
                <i className = "icon home" />
            </Button>
        </div>
    );
  }
}

export default Header;
