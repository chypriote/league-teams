import {bindable} from 'aurelia-framework';
import {TeamsAPI} from '../utility/teamsAPI';

export class TeamEditor {
	@bindable team;
	routeConfig;
	api = new TeamsAPI();
	error; success;

	editTeam() {
		let vm = this;
		this.error = null;
		this.success = null;

		this.api.updateTeam(vm.team)
			.then(function (response) {
				vm.team = response;
				vm.success = true;
			}, function (error) {
				vm.error = '[' + error.response + '] Impossible de sauvegarder l\'équipe';
			});
	}

	delete() {
		let api = new TeamsAPI();
		let vm = this;

		return api.deleteTeam(this.team.id)
			.then(function (response) {
				vm.team = null;
			}, function (error) {
				vm.error = '[' + error.response + '] Impossible de supprimer l\'équipe';
			});
	}


	setImages(player) {
		return {
			rank: '/assets/tiers/32/' + player.tier.toLowerCase() + '.png',
			role: '/assets/roles/32/' + player.position + '.png',
		}
	}


}