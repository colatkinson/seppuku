import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Button, Divider } from 'semantic-ui-react';
import * as shortid from 'shortid';

import 'semantic-ui-css/semantic.min.css';

import './Home.css';

interface HomeProps extends RouteComponentProps<{}> {}

class Home extends React.Component<HomeProps, {}> {
    onNewGameClick() {
        const newSeed = shortid.generate();

        this.props.history.push('/g/' + newSeed);
    }

    render() {
        return (
            <div className = "Home">
                <Container text = {true}>
                Welcome to Seppuku! We offer an exciting selection of billions of randomly-generated puzzles!

                <br />

                Please click below to start. The links to the puzzles are permanent, so you can share with friends!

                <Divider />

                <Container textAlign = "center">
                    <Button size = "huge" color = "violet" onClick = {() => this.onNewGameClick()}>New Game</Button>
                </Container>

                </Container>
            </div>
        );
    }
}

export default Home;
