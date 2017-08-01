import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Button, ButtonGroup, Divider } from 'semantic-ui-react';
import * as shortid from 'shortid';

import 'semantic-ui-css/semantic.min.css';

import '../styles/Home.css';

interface HomeProps extends RouteComponentProps<{}> {}

class Home extends React.Component<HomeProps, {}> {
    onNewGameClick(diff: string) {
        const newSeed = shortid.generate();

        this.props.history.push('/' + diff + '/' + newSeed);
    }

    onEasyGameClick() {
        this.onNewGameClick('easy');
    }

    onMedGameClick() {
        this.onNewGameClick('med');
    }

    onHardGameClick() {
        this.onNewGameClick('hard');
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
                    <ButtonGroup>
                        <Button size = "huge" color = "violet" onClick = {() => this.onEasyGameClick()}>
                            Easy
                        </Button>

                        <Button size = "huge" color = "violet" onClick = {() => this.onMedGameClick()}>
                            Medium
                        </Button>

                        <Button size = "huge" color = "violet" onClick = {() => this.onHardGameClick()}>
                            Hard
                        </Button>
                    </ButtonGroup>
                </Container>

                </Container>
            </div>
        );
    }
}

export default Home;
