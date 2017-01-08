import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {PlayerAdded} from '../events';
import {RiotAPI} from '../riotAPI';
import {TeamsAPI} from '../teamsAPI';

@inject(EventAggregator)
export class PlayerAdd {
	riot = new RiotAPI;
	api = new TeamsAPI;
	name;
	player;
	error; success;

  constructor(private ea: EventAggregator) {
  }

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

	submitPlayer() {
		let vm = this;
		let player = {
			name: this.player.real_name ? this.player.real_name : this.player.name,
			summoner_name: this.player.name,
			riot_id: this.player.id,
			position: this.player.position,
			tier: this.rankToDatabase(this.player.leagues[0].tier),
			division: this.romanToDecimal(this.player.leagues[0].entries[0].division),
			lps: this.player.leagues[0].entries[0].leaguePoints,
		};

		this.error = null;
		this.success = null;

		this.api.addPlayer(player)
			.then(function (response) {
				vm.ea.publish(new PlayerAdded(response));
				vm.name = null;
				vm.player = null;
				vm.success = true;
			}, function (error) {
				vm.error = '[' + error.response + '] Impossible de sauvegarder le joueur';
			});
	}
}
