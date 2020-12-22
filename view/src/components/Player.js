import React from 'react'
import PlayerHelper from "../helpers/playerHelper";

class Player extends React.Component{
    render(){
        if (this.props.player){
            let player = this.props.player
            let colorCode = ""
            if (player.team === "T"){
                colorCode = "tcolor"
            }else if (player.team === "CT"){
                colorCode = "ctcolor"
            }

            let name = player.name.length > 12 ? player.name.substring(0, 10) + "..." : player.name

            let imageSrc =
                `http://localhost:3001/players/${PlayerHelper.getAvatar(player.id)}.png`
            let flagSrc =
                `http://localhost:3001/flags/${PlayerHelper.getCountry(player.id)}.png`
            let teamSrc =
                `http://localhost:3001/teams/${PlayerHelper.getTeam(player.id)}.png`

            return(
                <div className={'player'}>
                    <div className={'player-card'}>
                        <div className={'player-card-info'}>
                            <div className={'player-card-info-avatar'}>
                                <img src={imageSrc} height={'100%'}/>
                            </div>
                            <div className={'player-card-info-text'}>
                                <div className={'player-card-info-text-logo'}>
                                    <img src={teamSrc} width={'90%'} />
                                </div>
                                <div className={'player-card-info-text-name'}>
                                    <p className={colorCode}>{name}</p>
                                </div>
                                <div className={'player-card-info-text-flag'}>
                                    <img src={flagSrc} width={'80%'} />
                                </div>
                            </div>
                        </div>
                        <div className={'player-card-stats'}>
                            <div className={'player-card-stats-health'}>
                                <div className={'player-card-stats-health-hp'}>
                                    <div></div>
                                    <p>{player.health}</p>
                                </div>
                                <div className={'player-card-stats-health-armor'}>
                                    <div></div>
                                    <p>{player.armor}</p>
                                </div>
                            </div>
                            <div className={'player-card-stats-performance'}>
                                <div className={'player-card-stats-performance-streak'}>
                                    <p>{player.streak}</p>
                                </div>
                                <div className={'player-card-stats-performance-kad'}>
                                    <div>
                                        <p className={colorCode}>K</p>
                                        <p>{player.stats.kill}</p>
                                    </div>
                                    <div>
                                        <p className={colorCode}>A</p>
                                        <p>{player.stats.assist}</p>
                                    </div>
                                    <div>
                                        <p className={colorCode}>D</p>
                                        <p>{player.stats.death}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={'player-card-stats-equipment'}>
                                <p><span>{player.weapon.ammo || 0}</span>
                                    <span className={colorCode}>/{player.weapon.reserved || 0}</span></p>
                            </div>
                        </div>
                    </div>
                    <div className={'player-advert'}></div>
                </div>
            )
        }
        else{
            return null
        }
    }
}

export default Player