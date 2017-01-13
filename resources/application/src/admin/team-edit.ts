import {TeamsAPI} from '../utility/teamsAPI';

export class TeamEdit {
	routeConfig;
	api = new TeamsAPI();
	teams; current;
	error; success;
	
	
	editTeam() {
		let vm = this;
		let team = {
			id: this.current.id,
			name: this.current.name,
			logo: this.current.logo,
			tag: this.current.tag
		};
		
		this.error = null;
		this.success = null;
		
		this.api.updateTeam(team)
			.then(function (response) {
				vm.current = response;
				vm.success = true;
			}, function (error) {
				vm.error = '[' + error.response + '] Impossible de sauvegarder l\'équipe';
			});
	}
	
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
	
	activate(params, routeConfig) {
		this.routeConfig = routeConfig;
		
		if (params.id) {
			this.api.getTeam(params.id).then(data => {
				this.current = data;
				this.routeConfig.navModel.setTitle(this.current.name);
				if (this.current.logo) {
					this.current.image = '/assets/teams/192/' + this.current.logo + '.png';
				}
			});
		}
		
	}
}