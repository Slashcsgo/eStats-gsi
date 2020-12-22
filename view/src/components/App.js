import React from 'react';
import Radar from "./Radar";
import Header from "./Header";
import KillBar from "./KillBar";
import TSide from "./TSide";
import CTSide from "./CTSide";
import Player from "./Player";
import openSocket from "socket.io-client";

class App extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            header: null,
            player: null,
            allPlayers: null
        }
    }

    componentDidMount() {
        this.socket = openSocket('http://localhost:3001')
        this.socket.on('render', msg => this.setState(msg))
    }

    render(){
        return(
            <div className={'app'}>
                <Radar
                    allPlayers={this.state.allPlayers}
                    header={this.state.header}
                    player={this.state.player}
                />
                <Header header={this.state.header}/>
                <KillBar/>
                <TSide
                    allPlayers={this.state.allPlayers}
                    player={this.state.player}
                />
                <Player player={this.state.player}/>
                <CTSide
                    allPlayers={this.state.allPlayers}
                    player={this.state.player}
                />
            </div>
        )
    }
}

export default App;
