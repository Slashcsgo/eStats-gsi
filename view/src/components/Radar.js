import React from 'react'
import maps from '../cfg/maps.json'
import radars from "../helpers/mapHelper";

class Radar extends React.Component{
    componentDidMount() {
        if (this.props.allPlayers){
            this.updateRadar()
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allPlayers){
            this.updateRadar()
        }
    }

    drawPlayer(ctx, player, map) {
        let x = (player.position.x - map.x) / map.size * 350
        let y = (map.y - player.position.y) / map.size * 350
        if (player.team === "CT"){
            ctx.fillStyle = player.obs === this.props.player.observer
                ? '#004867'
                : '#00A6FF'
        }else{
            ctx.fillStyle = player.obs === this.props.player.observer
                ? '#675100'
                : '#FFC800'
        }
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI)
        ctx.fill()
        ctx.stroke()
    }

    updateRadar(){
        let map = maps[this.props.header.map]
        let c = document.getElementById('canvas')
        const ctx = c.getContext('2d')
        ctx.clearRect(0,0, 350, 350)

        let bg = new Image(350, 350)
        bg.src = radars[this.props.header.map]

        ctx.drawImage(bg, 0, 0, 350, 350)
        let {ct, t} = this.props.allPlayers
        ct.forEach(e => {
            let pos = e.position.split(' ')
            let res = {
                id: e.id,
                obs: e.observer,
                team: e.team,
                position: {
                    x: parseInt(pos[0]),
                    y: parseInt(pos[1]),
                    z: parseInt(pos[2])
                }
            }
            if (e.health)
                this.drawPlayer(ctx, res, map)
        })
        t.forEach(e => {
            let pos = e.position.split(' ')
            let res = {
                id: e.id,
                obs: e.observer,
                position: {
                    x: parseInt(pos[0]),
                    y: parseInt(pos[1]),
                    z: parseInt(pos[2])
                }
            }
            if (e.health)
                this.drawPlayer(ctx, res, map)
        })
    }
    render() {

        if (this.props.allPlayers){
            return (
                <div className={'radar'}>
                    <canvas id={'canvas'} width={350} height={350}/>
                </div>
            );
        }
        else{
            return null
        }
    }
}

export default Radar