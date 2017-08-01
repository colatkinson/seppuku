import * as React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

import { Button, Header } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

class AppHeader extends React.Component<{}, {}> {
  render() {
    return (
        <div className = "Header">
            <Link to = "/">
                <Button className = "icon" color = "violet" size = "huge">
                    <i className = "icon home" />
                </Button>
            </Link>
            <Header as = "h1" className = "headerTitle">
                Seppuku
            </Header>
        </div>
    );
  }
}

export default AppHeader;
