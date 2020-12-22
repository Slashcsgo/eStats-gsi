import React from 'react'

class SideCard extends React.Component{
    render(){
        let postfix = this.props.postfix
        if (this.props.data){
            let player = this.props.data
            let name = player.name.length > 12 ? player.name.substring(0, 10) + "..." : player.name

            let colorCode = ""

            if (postfix === " +tside"){
                colorCode = this.props.obs === this.props.data.observer
                    ? "#675100"
                    : "#FFBC1C"
            }
            else{
                colorCode = this.props.obs === this.props.data.observer
                    ? "#004867"
                    : "#0088FF"
            }


            let color = ""

            if (player.health){
                color = `linear-gradient(90deg, ${colorCode} ${player.health}%, transparent ${player.health}%)`
            }
            else{
                color = 'black'
            }

            if(this.props.obs === this.props.data.observer)
                colorCode += "_active"

            return(
                <div className={'side-card-slider'}>
                    <div style={{background: color}}>
                        <div className={'side-card' + postfix}>
                            <div className={'side-card-armor'}>
                                <p>{player.armor}</p>
                                <div className={player.helmet ? 'hasHelmet' : 'hasntHelmet'}></div>
                            </div>
                            <div className={'side-card-info'}>
                                <p><span>{player.observer}|</span> {name} </p>
                                <p>${player.money}</p>
                            </div>
                            <div className={'side-card-stats'}>
                                <div>
                                    <p>K</p>
                                    <p>{player.stats.kill}</p>
                                </div>
                                <div>
                                    <p>A</p>
                                    <p>{player.stats.assist}</p>
                                </div>
                                <div>
                                    <p>D</p>
                                    <p>{player.stats.death}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )
        }
        else{
            return null
        }
    }
}

export default SideCard