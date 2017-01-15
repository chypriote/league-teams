import {TeamsAPI} from '../utility/teamsAPI';
import {RiotAPI} from '../utility/riotAPI';
import {PlayerUtility} from '../utility/player-utility';

export class Refresh {
	api = new TeamsAPI();
	riot = new RiotAPI();
	players;
	loading;
	
	
	refresh() {
		let vm = this;
		
		vm.loading = true;
		this.api.getPlayers().then(data => {
			vm.players = data;
			
			(function myLoop (i) {
				setTimeout(function () {
					let player = vm.players[i];
					player.updating = true;
					vm.riot.summonerLeague(player.riot_id).then(response => {
						player.leagues = response;
						player.position = PlayerUtility.positionToDatabase(player.position);
						player.tier = PlayerUtility.rankToDatabase(player.leagues[0].tier);
						player.division = PlayerUtility.romanToDecimal(player.leagues[0].entries[0].division);
						player.lps = player.leagues[0].entries[0].leaguePoints;
						player.updated = true;
						vm.api.updatePlayer(player);
						if (--i) myLoop(i); else vm.loading = false;
					});
				}, 1500)
			})(vm.players.length - 1);
			
		});
	}
}