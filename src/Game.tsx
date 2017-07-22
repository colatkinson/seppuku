import * as React from 'react';
// import { RouteComponentProps } from 'react-router-dom';
import './Game.css';

import Board from './Board';
import NumberPad from './NumberPad';

/* tslint:disable */
interface GameProps {
    match: any;
}
/* tslint:enable */

class Game extends React.Component<GameProps, {}> {
    render() {
        return (
            <div className = "Game">
                <div className = "gameHolder">
                    <div className = "boardHolderDiv">
                        <Board seed = {this.props.match.params.seed} />
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
