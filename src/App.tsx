import * as React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import './App.css';

import Game from './Game';
import Home from './Home';
import NotFound from './NotFound';
import Header from './Header';

class App extends React.Component<{}, {}> {
  render() {
    return (
        <Router>
            <div className="App">
                <div className = "appHeader">
                    <Header />
                </div>
                <div className = "appContent">
                    <Switch>
                        <Route exact = {true} path = "/" component = {Home} />
                        <Route
                            exact = {true}
                            path = "/g/:seed"
                            render = {
                                (props) => {
                                    return <Game match = {props.match} />;
                                }
                            }
                        />
                        <Route component = {NotFound} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
  }
}

export default App;
