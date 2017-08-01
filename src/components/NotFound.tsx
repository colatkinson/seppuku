import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import '../styles/NotFound.css';

interface NotFoundProps extends RouteComponentProps<{}> {}

class NotFound extends React.Component<NotFoundProps, {}> {
    render() {
        return (
            <div className = "NotFound">
                There's nothing here!
            </div>
        );
    }
}

export default NotFound;
