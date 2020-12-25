import React from 'react'
import { Live, Over, Pause, Freeze } from './SubHeaders'
import server from "../cfg/server.json"

class Header extends React.Component{
    getSubHeader(){
        let sub = null;
        
        if (this.props.header.state === 'live')
            sub = [<Live />]
        if (this.props.header.state === 'over' && this.props.round && this.props.round.winner)
            sub = [<Over winner={this.props.round.winner}/>, <Live />]
        if (this.props.header.state === 'timeout_ct')
            sub = [<Pause side={"ct"}/>]
        if (this.props.header.state === 'timeout_t')
            sub = [<Pause side={"t"}/>]
        if (this.props.header.state === 'freezetime')
            sub = [<Freeze />]

        return sub
    }
    render(){
        if (this.props.header){
            let minutes = Math.floor(this.props.header.time / 60)
            let seconds = String(Math.ceil(this.props.header.time % 60))
                .padStart(2, 0)
            let time = ""

            let state = this.props.header.state;

            if (state === 'live'){
                time = `${minutes}:${seconds}`
            } else if (state === 'freezetime'){
                time = `${minutes}:${seconds}`
            } else if (state === 'over'){
                time = "OVER"
            } else if (state === 'bomb'){
                time = "BOMB"
            } else if (state === 'pause'){
                time = "PAUSE"
            }
            return (
                <div className={"header"}>
                    <div className={"header-info"}>
                        <div className={"header-info-left"}>
                            <div className={"header-info-logo"}>
                                <img src={`http://${server.appip}:3001/teams/default.png`}/>
                            </div>
                            <div className={"header-info-team"}>
                                <p className={"tcolor"}>TERRORISTS</p>
                            </div>
                        </div>
                        <div className={"header-info-center"}>
                            <div className={"header-info-center-tscore"}>
                                <p className={"tcolor"}>{this.props.header.tScore}</p>
                            </div>
                            <div className={"header-info-center-center"}>
                                <div className={"header-info-center-center-time"}>
                                    {time}
                                </div>
                                <div className={"header-info-center-center-round"}>
                                    Round {this.props.header.rounds}/30
                                </div>
                            </div>
                            <div className={"header-info-center-ctscore"}>
                                <p className={"ctcolor"}>{this.props.header.ctScore}</p>
                            </div>
                        </div>
                        <div className={"header-info-right"}>
                            <div className={"header-info-team"}>
                                <p className={"ctcolor"}>COUNTER-TERRORISTS</p>
                            </div>
                            <div className={"header-info-logo"}>
                                <img src={`http://${server.appip}:3001/teams/navi.png`} />
                            </div>
                        </div>
                    </div>
                    {this.getSubHeader()}
                </div>
            )
        } else {
            return null
        }
    }
}

export default Header
