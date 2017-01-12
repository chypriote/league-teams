import {HttpClient} from 'aurelia-http-client';

export class TeamsAPI {
	client: HttpClient;

	constructor() {
		this.client = new HttpClient();
	}

	getPlayers() {
		let vm = this;
		let promise = new Promise(function (resolve, reject) {
				vm.client.get('/api/players')
					.then(response => resolve(JSON.parse(response.response)));
			});
		return promise;
	}

	getTeamLessPlayers() {
		let vm = this;
		let promise = new Promise(function (resolve, reject) {
			vm.client.get('/api/players/teamless')
                .then(response => resolve(JSON.parse(response.response)));
		});
		return promise;
	}

	getPlayer(id) {
		let vm = this;
		let promise = new Promise(function (resolve, reject) {
				vm.client.get('/api/players/' + id)
					.then(response => resolve(JSON.parse(response.response)));
			});
		return promise;
	}

	addPlayer(player) {
		let vm = this;

		let promise = new Promise(function (resolve, reject) {
				vm.client.post('/api/players', player)
					.then(response => resolve(JSON.parse(response.response)))
					.catch(error => reject(error.response));
			});
		return promise;
	}

	updatePlayer(player) {
		let vm = this;

		let promise = new Promise(function (resolve, reject) {
				vm.client.put('/api/players/'+ player.id, player)
					.then(response => resolve(JSON.parse(response.response)))
					.catch(error => reject(error.response));
			});
		return promise;
	}

	getPlayerTeams(id) {
		let vm = this;
		let promise = new Promise(function (resolve, reject) {
				vm.client.get('/api/players/' + id + '/teams')
					.then(response => resolve(JSON.parse(response.response)));
			});
		return promise;
	}

	getTeams() {
		let vm = this;
		let promise = new Promise(function (resolve, reject) {
				vm.client.get('/api/teams')
					.then(response => resolve(JSON.parse(response.response)));
			});
		return promise;
	}

	addTeam(team) {
		let vm = this;

		let promise = new Promise(function (resolve, reject) {
				vm.client.post('/api/teams', team)
					.then(response => resolve(JSON.parse(response.response)))
					.catch(error => reject(error.response));
			});
		return promise;
	}

	addTeamToPlayer(player_id, team_id) {
		let vm = this;

		let promise = new Promise(function (resolve, reject) {
				vm.client.post('/api/players/join-team', {player_id: player_id, team_id: team_id})
					.then(response => resolve(JSON.parse(response.response)))
					.catch(error => reject(error.response));
			});
		return promise;
	}

    latestTeams(number: number) {
			let vm = this;
	
			let promise = new Promise(function (resolve, reject) {
				vm.client.get('/api/teams/latest/' + number)
	                .then(response => resolve(JSON.parse(response.response)))
	                .catch(error => reject(error.response));
			});
			return promise;
    }
	
	latestPlayers(number: number) {
		let vm = this;
		
		let promise = new Promise(function (resolve, reject) {
			vm.client.get('/api/players/latest/' + number)
				.then(response => resolve(JSON.parse(response.response)))
				.catch(error => reject(error.response));
		});
		return promise;
	}
}
