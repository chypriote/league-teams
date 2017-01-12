import {bindable} from 'aurelia-framework';
import {TeamsAPI} from '../teamsAPI';

export class PlayerTeam {
	@bindable team;
	@bindable pid;
	api = new TeamsAPI();
	selectedTeam;
	edition; available;

	edit() {
		if (!this.available)
			this.api.getTeams().then(data => this.available = data);
		this.edition = !this.edition;
	}

	addTeam() {
		let vm = this;
		this.api.addTeamToPlayer(vm.pid, vm.selectedTeam.id).then(
			function(data) {
				vm.team = data;
				if (vm.team.logo) {
					vm.team.image = '/assets/teams/192/' + vm.team.logo + '.png';
				}
				vm.edition = !vm.edition;
			}
		);
	}
}
