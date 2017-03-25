import {PlayersAPI} from '../utility/playersAPI';
import {RiotAPI} from '../utility/riotAPI';
import {PlayerUtility} from '../utility/player-utility';

export class Player {
	routeConfig;
	player;
	success; error; refreshing;

	constructor() { }

	quickRefresh() {
		let vm = this;
		let riot = new RiotAPI;
		let api = new PlayersAPI();
		this.error = null;
		this.success = null;
		let updated = {
			id: vm.player.id,
			summoner_name: vm.player.summoner_name,
			tier: undefined,
			division: undefined,
			lps: undefined
		};
		this.refreshing = true;

		riot.summonerById(this.player.riot_id).then(
			function (response: any) {
				updated.summoner_name = response.name;

				riot.summonerLeague(vm.player.riot_id).then(
					function (response) {
						updated.tier = PlayerUtility.rankToDatabase(response[0].tier);
						updated.division = PlayerUtility.romanToDecimal(response[0].entries[0].division);
						updated.lps = response[0].entries[0].leaguePoints;

						api.updatePlayer(updated)
							.then(function (response) {
								Object.assign(vm.player, response);
								vm.success = 'Joueur mis à jour';
								vm.refreshing = null;
							}, function (error) {
								vm.error = '[' + error.response + '] Impossible de sauvegarder le joueur';
								vm.refreshing = null;
							});
					}
				);
			}
		);
	}

	setImages() {
		this.player.images = {
			rank: '/assets/tiers/192/' + this.player.tier.toLowerCase() + this.player.division + '.png',
			role: '/assets/roles/192/' + this.player.position + '.png'
		};
		if (this.player.team && this.player.team.logo) {
			this.player.team.image = '/assets/teams/192/' + this.player.team.logo + '.png';
		}
	}

	activate(params, routeConfig) {
		this.routeConfig = routeConfig;
		let api = new PlayersAPI();

		return api.getPlayer(params.id)
			.then(data => {
				this.player = data;
				this.routeConfig.navModel.setTitle(this.player.name);
				this.setImages();
			});
	}
}
