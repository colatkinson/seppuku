import * as React from 'react';
import './Game.css';

import Board from './Board';
import NumberPad from './NumberPad';

class Game extends React.Component<{}, {}> {
  render() {
    return (
        <div className = "Game">
            <div>
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

export default Game;
