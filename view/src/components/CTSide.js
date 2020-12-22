import React from 'react'
import SideCard from "./SideCard";

class CTSide extends React.Component{
    render(){
        if (this.props.allPlayers){
            let cards = this.props.allPlayers.ct.map((e) => <SideCard
                postfix={' +ctside'}
                data={e}
                obs={this.props.player.observer}
            />)

            return(
                <div className={'ctside'}>
                    {cards}
                </div>
            )
        }
        else{
            return null
        }
    }
}

export default CTSide