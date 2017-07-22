import * as React from 'react';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import './App.css';

import Game from './Game';
import Home from './Home';
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
                </div>
            </div>
        </Router>
    );
  }
}

export default App;
