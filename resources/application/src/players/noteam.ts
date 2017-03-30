import {PlayersAPI} from '../utility/playersAPI';
import {PlayerUtility} from '../utility/player-utility';

export class PlayerNoTeam {
    api = new PlayersAPI();
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
								player.country_icon = PlayerUtility.countryToIcon(player.country);
                return player
            });
        });
    }

}
