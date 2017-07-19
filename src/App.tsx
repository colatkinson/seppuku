import * as React from 'react';
import './App.css';

import Board from './Board';
import NumberPad from './NumberPad';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="App">
        <div className = "Game">
            <div className = "boardHolderDiv">
                <Board seed = "hello." />
            </div>
            <div className = "numPadHolderDiv">
                <NumberPad />
            </div>
        </div>
      </div>
    );
  }
}

export default App;
