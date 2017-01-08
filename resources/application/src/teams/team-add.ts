import {TeamsAPI} from '../teamsAPI';


export class TeamAdd {
	api = new TeamsAPI;
	name; logo;	error; success;


	submitTeam() {
		let vm = this;

		this.error = null;
		this.success = null;

		let team = {
			name: this.name,
			logo: this.logo
		};

		this.api.addTeam(team)
			.then(function () {
				vm.name = null;
				vm.logo = null;
				vm.success = true;
			}, function (error) {
				vm.error = '[' + error.response + '] Impossible de sauvegarder l\'équipe';
			});
	}
}
