import * as React from 'react';
import './App.css';

import Game from './Game';
import Header from './Header';

class App extends React.Component<{}, {}> {
  render() {
    return (
        <div className="App">
            <div className = "appHeader">
                <Header />
            </div>
            <div className = "appContent">
                <Game />
            </div>
        </div>
    );
  }
}

export default App;
