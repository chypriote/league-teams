import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {PlayerAdded} from '../utility/events';
import {PlayersAPI} from '../utility/playersAPI';

@inject(EventAggregator)
export class List {
	api = new PlayersAPI();
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

		this.api.getPlayers().then(function (data: any) {
			vm.players = vm.preparePlayers(data.data);
			vm.pages = {
				current: data.current_page,
				last: data.last_page
			};
		});
	}

	activate(params, routeConfig) {
		this.routeConfig = routeConfig;
		let vm = this;
		let page = params.page ? params.page : null;

		this.api.getPlayers(page).then(function (data: any) {
			vm.players = vm.preparePlayers(data.data);
			vm.pages = {
				current: data.current_page,
				last: data.last_page
			};
			vm.routeConfig.navModel.setTitle(vm.pages.current != 1 ? 'Joueurs - Page ' + vm.pages.current : 'Joueurs');
		});
	}

}
