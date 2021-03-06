import * as React from 'react';
import '../styles/Game.css';
import { Route } from 'react-router-dom';

import Board from './Board';
import NumberPad from './NumberPad';
import ShareButton from './ShareButton';

/* tslint:disable */
interface GameProps {
    match: any;
    diff: string;
}
/* tslint:enable */

class Game extends React.Component<GameProps, {}> {
    render() {
        return (
            <div className = "Game">
                <Route
                    component = {() => {
                        return (
                            <div className = "gameHolder">
                                <ShareButton />
                                <div className = "boardHolderDiv">
                                    <Board
                                        seed = {this.props.match.params.seed}
                                        diff = {this.props.diff}
                                    />
                                </div>
                                <div className = "numPadHolderDiv">
                                    <NumberPad />
                                </div>
                            </div>
                        );
                    }}
                />
            </div>
    );
  }
}

export default Game;
