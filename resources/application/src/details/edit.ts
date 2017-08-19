import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {PlayersAPI} from '../utility/playersAPI';
import {RiotAPI} from '../utility/riotAPI';
import {PlayerUtility} from '../utility/player-utility';
import * as _ from 'lodash';

@inject(Router)
export class Edit {
	routeConfig; router;
	api = new PlayersAPI;
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

	editPlayer() {
		let vm = this;
		let league = _.find(vm.player.leagues, function (league) {
			return league.queue === 'RANKED_SOLO_5x5';
		});
		
		let player = {
			id: this.player.id,
			name: this.player.name ? this.player.name : this.player.summoner_name,
			summoner_name: this.player.summoner_name,
			position: PlayerUtility.positionToDatabase(this.player.position),
			tier: this.player.leagues ? PlayerUtility.rankToDatabase(league.tier) : null,
			division: this.player.leagues ? PlayerUtility.romanToDecimal(league.entries[0].division) : null,
			country: this.player.country,
			lps: this.player.leagues ? league.leaguePoints : null,
			comment: this.player.comment
		};
		
		this.error = null;
		this.success = null;
		this.api.updatePlayer(player)
			.then(function (response) {
				vm.router.navigateToRoute('player', {id: player.id});
			}, function (error) {
				vm.error = '[' + error.response + '] Impossible de sauvegarder le joueur';
			});
	}

	activate(params, routeConfig) {
		this.routeConfig = routeConfig;

		return this.api.getPlayer(params.id)
			.then(data => {
				this.player = data;
				this.routeConfig.navModel.setTitle(this.player.name);
				this.setImages();
			});
	}
}
