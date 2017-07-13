import * as React from 'react';
import './App.css';

import Board from './Board';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="App">
        <div className = "boardHolderDiv">
            <Board seed = "hello." onClick = {(e) => console.log(e.target)} />
        </div>
      </div>
    );
  }
}

export default App;
