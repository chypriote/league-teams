import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {PlayerAdded} from '../events';
import {TeamsAPI} from '../teamsAPI';

@inject(EventAggregator)
export class PlayerList {
	api = new TeamsAPI();
	players;

	constructor(private ea: EventAggregator) {
		ea.subscribe(PlayerAdded, msg => this.players.push(msg.player));
	}

	setImages(player) {
		return {
			rank: '/assets/tiers/32/' + player.tier.toLowerCase() + '.png',
			role: '/assets/roles/32/' + player.position + '.png',
		}
	}

	created() {
		let vm = this;
		this.api.getPlayers().then(function (data) {
			vm.players = data;
			vm.players.forEach(function (player) {
				player.images = vm.setImages(player);
				if (player.team && player.team.logo) {
					player.team.image = '/assets/teams/32/' + player.team.logo + '.png';
				}
				return player
			});
		});
	}

}
