import {PlayersAPI} from '../../utility/playersAPI';

export class Mid {
	players;
	
	setImages(player) {
		return {
			rank: '/assets/tiers/32/' + player.tier.toLowerCase() + '.png',
			role: '/assets/roles/32/' + player.position + '.png',
		}
	}
	
	preparePlayers(players) {
		let vm = this;
		players.forEach(function (player) {
			player.images = vm.setImages(player);
			if (player.team && player.team.logo) {
				player.team.image = '/assets/teams/32/' + player.team.logo + '.png';
			}
			return player
		});
		return players;
	}
	
	activate(params, routeConfig) {
		let vm = this;
		
		routeConfig.navModel.setTitle('Mids');
		new PlayersAPI().getMids().then(data => vm.players = vm.preparePlayers(data));
	}
}
