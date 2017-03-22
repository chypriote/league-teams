import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {PlayerAdded} from '../utility/events';
import {TeamsAPI} from '../utility/teamsAPI';

@inject(EventAggregator)
export class All {
	api = new TeamsAPI();
	players;
	routeConfig;
	pages;

	constructor(private ea: EventAggregator) {
		ea.subscribe(PlayerAdded, msg => this.players.push(msg.player));
	}

	setImages(player) {
		return {
			rank: '/assets/tiers/32/' + player.tier.toLowerCase() + '.png',
			role: '/assets/roles/32/' + player.position + '.png',
		}
	}
	preparePlayers(players) {
		let vm = this;
		players.forEach(function (player) {
				player.images = vm.setImages(player);
				if (player.team && player.team.logo) {
					player.team.image = '/assets/teams/32/' + player.team.logo + '.png';
				}
				return player
			});
		return players;
	}

	created(params, routeConfig) {
		let vm = this;

		this.api.getAllPlayers().then(data => vm.players = vm.preparePlayers(data));
	}
}
