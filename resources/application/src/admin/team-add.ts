import {TeamsAPI} from '../teamsAPI';

export class TeamAdd {
	api = new TeamsAPI;
	name; logo;	error; success;
	latest;

	constructor() {
		let vm = this;
		this.api.latestTeams(10).then(data => {
			vm.latest = data;
			vm.latest.forEach(function (team) {
				if (team.logo) {
					team.image = '/assets/teams/32/' + team.logo + '.png';
				}
				return team
			});
		});
	}

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
