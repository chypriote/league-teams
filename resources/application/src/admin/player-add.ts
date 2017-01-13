import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {PlayerUtility} from '../utility/player-utility';
import {RiotAPI} from '../utility/riotAPI';
import {TeamsAPI} from '../utility/teamsAPI';
import {PlayerAdded} from "../utility/events";

@inject(EventAggregator)
export class PlayerAdd {
	riot = new RiotAPI;
	api = new TeamsAPI;
	name; player;
	error; success;
	
	constructor(private ea: EventAggregator) {}
	
	findPlayer() {
		let vm = this;

		this.success = false;
		this.error = false;
		this.riot.summonerByName(this.name).then(
			function (response) {
				vm.player = response;
				vm.player.set = true;

				vm.riot.summonerLeague(vm.player.id).then(
					function (response) {
						vm.player.leagues = response;
					}
				);
			}, function (error) {
				vm.error = '[' + error + '] Impossible de récupérer les informations du joueur';
			}
		);
	}

	editPlayer() {
		this.player.set = false;
	}

	submitPlayer() {
		let vm = this;
		let player = {
			name: this.player.real_name ? this.player.real_name : this.player.name,
			summoner_name: this.player.name,
			riot_id: this.player.id,
			position: PlayerUtility.positionToDatabase(this.player.position),
			tier: PlayerUtility.rankToDatabase(this.player.leagues[0].tier),
			division: PlayerUtility.romanToDecimal(this.player.leagues[0].entries[0].division),
			lps: this.player.leagues[0].entries[0].leaguePoints,
		};

		this.error = null;
		this.success = null;

		this.api.addPlayer(player)
			.then(function (response) {
				vm.name = null;
				vm.player = null;
				vm.success = true;
				vm.ea.publish(new PlayerAdded(response));
			}, function (error) {
				vm.error = '[' + error.response + '] Impossible de sauvegarder le joueur';
			});
	}
}
