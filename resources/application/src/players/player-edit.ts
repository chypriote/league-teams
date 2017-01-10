import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {TeamsAPI} from '../teamsAPI';
import {RiotAPI} from '../riotAPI';


@inject(Router)
export class PlayerEdit {
	routeConfig; router;
	api = new TeamsAPI;
	player;
	refreshing; refreshed;
	error; success;

	constructor(router) {
		this.router = router;
	}

	setImages() {
		this.player.images = {
			rank: '/assets/tiers/192/' + this.player.tier.toLowerCase() + this.player.division + '.png',
			role: '/assets/roles/192/' + this.player.position + '.png',
		}
	}

	updatePlayer() {
		let vm = this;
		let riot = new RiotAPI;

		vm.refreshing = true;
		riot.summonerById(this.player.riot_id).then(
			function (response: any) {
				vm.player.summoner_name = response.name;

				riot.summonerLeague(vm.player.riot_id).then(
					function (response) {
						vm.player.leagues = response;
						vm.refreshing = false;
						vm.refreshed = true;
					}
				);
			}
		);
	}

	romanToDecimal(roman: string) {
		switch (roman) {
			case "I":
				return 1;
			case "II":
				return 2;
			case "III":
				return 3;
			case "IV":
				return 4;
			case "V":
				return 5;
			default:
				return 0;
		}
	}

	rankToDatabase(rank: string) {
		switch (rank) {
			case 'CHALLENGER':
				return '10_challenger';
			case 'MASTER':
				return '20_master';
			case 'DIAMOND':
				return '30_diamond';
			case 'PLATINUM':
				return '40_platinum';
			default:
				return null;
		}
	}

	editPlayer() {
		let vm = this;
		let player = {
			id: this.player.id,
			name: this.player.name ? this.player.name : this.player.summoner_name,
			summoner_name: this.player.summoner_name,
			position: this.player.position,
			tier: this.player.leagues ? this.rankToDatabase(this.player.leagues[0].tier) : null,
			division: this.player.leagues ? this.romanToDecimal(this.player.leagues[0].entries[0].division) : null,
			lps: this.player.leagues ? this.player.leagues[0].entries[0].leaguePoints : null,
			comment: this.player.comment
		};

		this.error = null;
		this.success = null;

		this.api.updatePlayer(player)
			.then(function (response) {
				console.log(response);
				vm.router.navigateToRoute('player', {id: player.id});
			}, function (error) {
				vm.error = '[' + error.response + '] Impossible de sauvegarder le joueur';
			});
	}

	activate(params, routeConfig) {
		this.routeConfig = routeConfig;
		let client = new TeamsAPI();

		return client.getPlayer(params.id)
			.then(data => {
				this.player = data;
				this.routeConfig.navModel.setTitle(this.player.name);
				this.setImages();
			});
	}
}
