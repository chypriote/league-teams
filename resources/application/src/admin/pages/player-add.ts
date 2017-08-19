import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {PlayerUtility} from '../../utility/player-utility';
import {RiotAPI} from '../../utility/riotAPI';
import {PlayersAPI} from '../../utility/playersAPI';
import {PlayerAdded} from "../../utility/events";
import * as _ from 'lodash';

@inject(EventAggregator)
export class PlayerAdd {
	riot = new RiotAPI;
	api = new PlayersAPI;
	name; player;
	error; success; loading;

	constructor(private ea: EventAggregator) {}

	findPlayer() {
		let vm = this;

		this.success = false;
		this.error = false;
		this.loading = true;

		this.riot.summonerByName(this.name).then(
			response => {
				vm.player = response;

				if (vm.player.id) {
					vm.api.checkPlayer(vm.player.id).then(
						function () {
							vm.loading = false;
							vm.riot.summonerLeague(vm.player.id).then(
								response => { vm.player.leagues = response; vm.player.set = true; },
								error => vm.error = {message: 'Impossible de récupérer les leagues du joueur'}
							);
						},
						error => {vm.error = error; vm.loading = false;}
					);

				} else {
					vm.loading = false;
					vm.error = {message: 'Impossible de récupérer les informations du joueur.'};
				}

			}, error => vm.error = error);
	}

	editPlayer() {
		this.player.set = false;
	}

	submitPlayer() {
		let vm = this;
		let league = _.find(vm.player.leagues, function (league) {
			return league.queue === 'RANKED_SOLO_5x5';
		});

		let player = {
			name: this.player.real_name ? this.player.real_name : this.player.name,
			summoner_name: this.player.name,
			riot_id: this.player.id,
			position: PlayerUtility.positionToDatabase(this.player.position),
			tier: PlayerUtility.rankToDatabase(league.tier),
			division: PlayerUtility.romanToDecimal(league.entries[0].division),
			lps: league.entries[0].leaguePoints,
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
				if (error.message && error.message.tier)
					vm.error = {message:'Tier invalide (minimum: Gold)'};
				else
					vm.error = error;
			});
	}
}
