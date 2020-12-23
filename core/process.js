class Process{
    getHeader(data){
        let header = {
            state: "",
            time: "",
            tScore: "",
            ctScore: "",
            rounds: "",
            map: ""
        }
        if (data.phase_countdowns && data.map){
            header.time = data.phase_countdowns.phase_ends_in
            header.state = data.phase_countdowns.phase
            header.ctScore = data.map.team_ct.score
            header.tScore = data.map.team_t.score
            header.rounds = data.map.round
            header.map = data.map.name
        }
        return header
    }

    getPlayer(data){
        let player = {
            id: "",
            name: "",
            health: "",
            armor: "",
            helmet: "false",
            team: "",
            observer: "",
            stats: {
                kill: "",
                assist: "",
                death: ""
            },
            weapon: {
                ammo: "",
                reserved: ""
            }
        }
        if (data.player && data.player.state && data.player.match_stats && data.player.weapons){
            player.id = data.player.steamid
            player.name = data.player.name
            player.health = data.player.state.health
            player.armor = data.player.state.armor
            player.helmet = data.player.state.helmet
            player.streak = data.player.state.round_kills
            player.team = data.player.team;
            player.observer = data.player.observer_slot;

            player.stats.kill = data.player.match_stats.kills
            player.stats.assist = data.player.match_stats.assists
            player.stats.death = data.player.match_stats.deaths

            let weapons = Object.keys(data.player.weapons)
                .map((key) => data.player.weapons[key])
                .filter((e) => e.state === "active")[0]
            if (weapons){
                player.weapon.ammo = weapons.ammo_clip || ""
                player.weapon.reserved = weapons.ammo_reserve || ""
            }

        }

        return player
    }

    getAllPlayers(data){
        let allPlayers = Object.keys(data.allplayers).map((key) => {
            let player = data.allplayers[key]
            let res = {
                id: key,
                name: player.name,
                observer: player.observer_slot,
                health: player.state.health,
                armor: player.state.armor,
                helmet: player.state.helmet,
                money: player.state.money,
                team: player.team,
                position: player.position,
                stats: {
                    kill: player.match_stats.kills,
                    assist: player.match_stats.assists,
                    death: player.match_stats.deaths
                },
                weapon: {
                    ammo: "",
                    reserved: ""
                }
            }
            if (player){
                let weapons = Object.keys(player.weapons)
                    .map((key) => player.weapons[key])
                    .filter((e) => e.state === "active")[0]
                if (weapons){
                    res.weapon.ammo = weapons.ammo_clip || ""
                    res.weapon.reserved = weapons.ammo_reserve || ""
                }
            }
            return res
        })
        let ct = allPlayers.filter((e) => e.team === "CT")
        let t = allPlayers.filter((e) => e.team === "T")

        let res = {
            ct: ct,
            t: t
        }

        return res
    }
    getRound(data){
        let res = {
            winner: ""
        }
        if (data.round){
            res.winner = data.round.win_team
        }
        return res
    }

    get(data) {
        //processing header
        let header = this.getHeader(data)
        // console.log(header)

        //processing player
        let player = this.getPlayer(data)
        // console.log(player)

        let allPlayers = this.getAllPlayers(data)
        // console.log(allPlayers)

        let round = this.getRound(data)
        //console.log(round)

        let result = {
            header: header,
            player: player,
            allPlayers: allPlayers,
            round: round
        }
        return result
    }
}

module.exports = Process
