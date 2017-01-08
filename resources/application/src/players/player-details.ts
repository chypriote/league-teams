import {TeamsAPI} from '../teamsAPI';

export class PlayerDetail {
	routeConfig;
	player;

	constructor() { }

	setImages() {
		this.player.images = {
			rank: '/assets/tiers/192/' + this.player.tier.toLowerCase() + this.player.division + '.png',
			role: '/assets/roles/192/' + this.player.position + '.png'
		};
		if (this.player.team && this.player.team.logo) {
			this.player.team.image = '/assets/teams/192/' + this.player.team.logo + '.png';
		}
	}

	activate(params, routeConfig) {
		this.routeConfig = routeConfig;
		let client = new TeamsAPI();

		return client.getPlayer(params.id)
			.then(data => {
				this.player = data;
				this.routeConfig.navModel.setTitle(this.player.name);
				this.setImages();
			});
	}
}
