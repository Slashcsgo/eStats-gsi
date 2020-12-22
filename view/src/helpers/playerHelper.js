import players from '../cfg/players.json'

class PlayerHelper{
    static getPlayer(steamid){
        return players[steamid] || {
            "avatar": "default",
            "country": "russia",
            "team": "default"
        }
    }

    static getAvatar(steamid){
        return this.getPlayer(steamid).avatar
    }

    static getCountry(steamid){
        return this.getPlayer(steamid).country
    }

    static getTeam(steamid){
        return this.getPlayer(steamid).team
    }
}

export default PlayerHelper