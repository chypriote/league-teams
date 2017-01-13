import {HttpClient} from 'aurelia-http-client';

export class TeamsAPI {
	client: HttpClient;

	constructor() {
		this.client = new HttpClient();
	}

	getPlayers() {
		let vm = this;
		return new Promise(function (resolve, reject) {
			vm.client.get('/api/players')
				.then(response => resolve(JSON.parse(response.response)))
				.catch(error => reject(JSON.parse(error.response)));
		});
	}
	getTeamLessPlayers() {
		let vm = this;
		return new Promise(function (resolve, reject) {
			vm.client.get('/api/players/teamless')
				.then(response => resolve(JSON.parse(response.response)))
				.catch(error => reject(JSON.parse(error.response)));
		});
	}
	getPlayer(id) {
		let vm = this;
		return new Promise(function (resolve, reject) {
			vm.client.get('/api/players/' + id)
				.then(response => resolve(JSON.parse(response.response)))
				.catch(error => reject(JSON.parse(error.response)));
		});
	}
	checkPlayer(riot_id) {
		let vm = this;
		return new Promise(function (resolve, reject) {
			vm.client.get('/api/players/validate-id/' + riot_id)
				.then(response => resolve(), error => reject(JSON.parse(error.response)));
		});
	}
	addPlayer(player) {
		let vm = this;
		return new Promise(function (resolve, reject) {
			vm.client.post('/api/players', player)
				.then(response => resolve(JSON.parse(response.response)))
				.catch(error => reject(JSON.parse(error.response)));
		});
	}
	updatePlayer(player) {
		let vm = this;
		return new Promise(function (resolve, reject) {
			vm.client.put('/api/players/' + player.id, player)
				.then(response => resolve(JSON.parse(response.response)))
				.catch(error => reject(error.response));
		});
	}
	addTeamToPlayer(player_id, team_id) {
		let vm = this;
		return new Promise(function (resolve, reject) {
			vm.client.post('/api/players/join-team', {player_id: player_id, team_id: team_id})
				.then(response => resolve(JSON.parse(response.response)))
				.catch(error => reject(error.response));
		});
	}
	latestPlayers(number: number) {
		let vm = this;
		return new Promise(function (resolve, reject) {
			vm.client.get('/api/players/latest/' + number)
				.then(response => resolve(JSON.parse(response.response)))
				.catch(error => reject(error.response));
		});
	}
	
	getTeams() {
		let vm = this;
		return new Promise(function (resolve, reject) {
			vm.client.get('/api/teams')
				.then(response => resolve(JSON.parse(response.response)))
				.catch(error => reject(error.response));
		});
	}
	getTeam(id) {
		let vm = this;
		return new Promise(function (resolve, reject) {
			vm.client.get('/api/teams/' + id)
				.then(response => resolve(JSON.parse(response.response)))
				.catch(error => reject(error.response));
		});
	}
	addTeam(team) {
		let vm = this;
		return new Promise(function (resolve, reject) {
			vm.client.post('/api/teams', team)
				.then(response => resolve(JSON.parse(response.response)))
				.catch(error => reject(error.response));
		});
	}
	updateTeam(team) {
		let vm = this;
		return new Promise(function (resolve, reject) {
			vm.client.put('/api/teams/' + team.id, team)
				.then(response => resolve(JSON.parse(response.response)))
				.catch(error => reject(error.response));
		});
	}
  latestTeams(number: number) {
		let vm = this;
    return new Promise(function (resolve, reject) {
			vm.client.get('/api/teams/latest/' + number)
				.then(response => resolve(JSON.parse(response.response)))
				.catch(error => reject(error.response));
		});
  }
}
