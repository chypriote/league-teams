import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {TeamsAPI} from '../utility/teamsAPI';
import {RiotAPI} from '../utility/riotAPI';
import {PlayerUtility} from '../utility/player-utility';

@inject(Router)
export class Team {
	routeConfig;
	team; router
	error; success;

	constructor(router) {
		this.router = router;
	}

	delete() {
		let api = new TeamsAPI();
		let vm = this;

		return api.deleteTeam(this.team.id)
			.then(function (response) {
				vm.router.navigateToRoute('teams');
			}, function (error) {
				vm.error = '[' + error.response + '] Impossible de supprimer l\'équipe';
			});
	}

	activate(params, routeConfig) {
		this.routeConfig = routeConfig;
		let api = new TeamsAPI();

		return api.getTeam(params.id)
			.then(data => {
				this.team = data;
				if (this.team.logo) {
					this.team.image = '/assets/teams/32/' + this.team.logo + '.png';
				}
				this.routeConfig.navModel.setTitle(this.team.name);
			});
	}
}