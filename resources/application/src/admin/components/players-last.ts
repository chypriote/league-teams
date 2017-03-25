import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {PlayersAPI} from "../../utility/playersAPI";
import {PlayerAdded} from "../../utility/events";

@inject(EventAggregator)
export class PlayersLast {
	api = new PlayersAPI();
	latest;

	constructor(private ea: EventAggregator) {
		ea.subscribe(PlayerAdded, msg => {
			let player = msg.player;
			player.images =  this.setImages(player);
			this.latest.unshift(player);
		});
	}

	setImages(player) {
		return {
			rank: '/assets/tiers/32/' + player.tier.toLowerCase() + '.png',
			role: '/assets/roles/32/' + player.position + '.png',
		}
	}

	attached() {
		let vm = this;
		this.api.latestPlayers(10).then(function(data) {
			vm.latest = data;
			vm.latest.forEach(function (player) {
				player.images = vm.setImages(player);
				if (player.team && player.team.logo) {
					player.team.image = '/assets/teams/32/' + player.team.logo + '.png';
				}
				return player
			});
		});
	}
}
