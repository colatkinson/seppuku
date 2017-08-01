import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';
import '../styles/NotFound.css';

interface NotFoundProps extends RouteComponentProps<{}> {}

class NotFound extends React.Component<NotFoundProps, {}> {
    render() {
        return (
            <div className = "NotFound">
                <Container textAlign = "center">
                    <Header size = "huge">
                        Whoops!
                    </Header>

                    <p>There's nothing here</p>
                </Container>
            </div>
        );
    }
}

export default NotFound;
