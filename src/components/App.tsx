import * as React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import '../styles/App.css';

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
                            path = "/easy/:seed"
                            render = {(props) => <Game diff = "easy" match = {props.match} />}
                        />
                        <Route
                            exact = {true}
                            path = "/med/:seed"
                            render = {(props) => <Game diff = "med" match = {props.match} />}
                        />
                        <Route
                            exact = {true}
                            path = "/hard/:seed"
                            render = {(props) => <Game diff = "hard" match = {props.match} />}
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
