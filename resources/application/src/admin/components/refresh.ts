import {PlayersAPI} from '../../utility/playersAPI';
import {RiotAPI} from '../../utility/riotAPI';
import {PlayerUtility} from '../../utility/player-utility';

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
									player.leagues = response;
									player.position = PlayerUtility.positionToDatabase(player.position);
									player.tier = PlayerUtility.rankToDatabase(player.leagues[0].tier);
									player.division = PlayerUtility.romanToDecimal(player.leagues[0].entries[0].division);
									player.lps = player.leagues[0].entries[0].leaguePoints;
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
