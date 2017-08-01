import * as React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import * as shortid from 'shortid';
import 'semantic-ui-css/semantic.min.css';
import '../styles/Board.css';

interface WonModalProps {
    open: boolean;
    diff: string;
}

class WonModal extends React.Component<WonModalProps, {}> {
    render() {
        return (
            <Modal
                basic = {true}
                size = "small"
                open = {this.props.open}
            >
                <Header icon = "smile" content = "You won!" />
                <Modal.Content>
                    <p>I bet you can't do the next one, though!</p>
                </Modal.Content>
                <Modal.Actions>
                    <Link to = "/">
                        <Button inverted = {true}>
                            Home
                        </Button>
                    </Link>

                    <Link to = {'/' + this.props.diff + '/' + shortid.generate()}>
                        <Button color = "violet" inverted = {true}>
                            New Game
                        </Button>
                    </Link>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default WonModal;
