import {PlayersAPI} from '../../utility/playersAPI';
import {RiotAPI} from '../../utility/riotAPI';
import {PlayerUtility} from '../../utility/player-utility';
import * as _ from 'lodash';

export class Refresh {
	api = new PlayersAPI();
	riot = new RiotAPI();
	players;
	loading; handled; stop;

	stopUpdate() {
		this.stop = true;
	}

	refresh() {
		let vm = this;

		vm.stop = false;
		vm.loading = true;
		this.api.getAllPlayers().then(data => {
			vm.players = data;

			(function myLoop (i) {

				if (vm.stop) {
					vm.loading = false;
					return;
				}

				setTimeout(function () {
					let player = vm.players[i];
					player.updating = true;
					vm.handled = vm.players.length - i;

					//Get infos for summoner
					vm.riot.summonerById(player.riot_id)
						.then(function(response: any) {
							player.summoner_name = response.name;
							//Retrieve summoner's leagues
							vm.riot.summonerLeague(player.riot_id)
								.then(response => {
									let league = _.find(response, function (league) {
										return league.queue === 'RANKED_SOLO_5x5';
									});

									player.position = PlayerUtility.positionToDatabase(player.position);
									player.tier = PlayerUtility.rankToDatabase(league.tier);
									player.division = PlayerUtility.romanToDecimal(league.entries[0].division);
									player.lps = league.entries[0].leaguePoints;
									player.updated = true;
									vm.api.updatePlayer(player);

									//Repeat until we dealt with all players
									if (--i) myLoop(i); else vm.loading = false;
								})
								.catch(e => myLoop(i));
						})
						.catch(e => myLoop(i));
				}, 3000);

			})(vm.players.length - 1);

		});
	}
}
