import {TeamsAPI} from '../utility/teamsAPI';

export class PlayerNoTeam {
    api = new TeamsAPI();
    players;

    setImages(player) {
        return {
            rank: '/assets/tiers/32/' + player.tier.toLowerCase() + '.png',
            role: '/assets/roles/32/' + player.position + '.png',
        }
    }

    created() {
        let vm = this;
        this.api.getTeamLessPlayers().then(function (data) {
            vm.players = data;
            vm.players.forEach(function (player) {
                player.images = vm.setImages(player);
                return player
            });
        });
    }

}
