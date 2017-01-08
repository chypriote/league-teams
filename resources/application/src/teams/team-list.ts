import {TeamsAPI} from '../teamsAPI';

export class TeamList {
	teams;

	constructor() {}

	created() {
		let client = new TeamsAPI();
		let vm = this;
		client.getTeams().then(data => {
			vm.teams = data;
			vm.teams.forEach(function (team) {
				if (team.logo) {
					team.image = '/assets/teams/32/' + team.logo + '.png';
				}
				return team
			});
		});
	}
}
