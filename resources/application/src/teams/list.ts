import {TeamsAPI} from '../utility/teamsAPI';
import {PlayerUtility} from '../utility/player-utility';

export class List {
	teams;

	constructor() {}

	setImages(player) {
		return {
			rank: '/assets/tiers/32/' + PlayerUtility.rankFromDatabase(player.tier).toLowerCase() + '.png',
			role: '/assets/roles/32/' + PlayerUtility.positionFromDatabase(player.position) + '.png',
		}
	}

	created() {
		let client = new TeamsAPI();
		let vm = this;
		client.getTeams().then(data => {
			vm.teams = data;
			vm.teams.forEach(function (team) {
				if (team.logo) {
					team.image = '/assets/teams/32/' + team.logo + '.png';
				}
				team.players.forEach(function (player) {
					player.images = vm.setImages(player);
					return player
				});
				return team
			});
		});
	}
}
