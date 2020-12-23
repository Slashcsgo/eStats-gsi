import React from 'react'
import SideCard from "./SideCard";

class TSide extends React.Component{
    render(){
        if (this.props.allPlayers){
            let cards = this.props.allPlayers.t.map((e) => <SideCard
                postfix={' +tside'}
                data={e}
                obs={this.props.player.observer}
            />)

            return(
                <div className={'tside'}>
                    {cards}
                </div>
            )
        }
        else{
            return null
        }
    }
}

export default TSide
