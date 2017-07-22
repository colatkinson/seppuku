import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './Home.css';

interface HomeProps extends RouteComponentProps<{}> {}

class Home extends React.Component<HomeProps, {}> {
    render() {
        return (
            <div className = "Home">
                Hello, world!
            </div>
        );
    }
}

export default Home;
