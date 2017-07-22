import * as React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import { Button } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

class Header extends React.Component<{}, {}> {
  render() {
    return (
        <div className = "Header">
            <Link to = "/">
                <Button className = "icon" color = "violet">
                    <i className = "icon home" />
                </Button>
            </Link>
            <h1 className = "headerTitle">
                Seppuku
            </h1>
        </div>
    );
  }
}

export default Header;
