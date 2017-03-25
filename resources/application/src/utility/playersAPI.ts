import {HttpClient} from 'aurelia-http-client';

export class PlayersAPI {
	client: HttpClient;

	constructor() {
		this.client = new HttpClient();
	}

	// REST API
	getPlayers(page?: number) {
		let vm = this;
		return new Promise(function (resolve, reject) {
			vm.client.get('/api/players?page=' + page)
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

	// Functional API
	getAllPlayers() {
		let vm = this;
		return new Promise(function (resolve, reject) {
			vm.client.get('/api/players/position/all')
				.then(response => resolve(JSON.parse(response.response)))
				.catch(error => reject(JSON.parse(error.response)));
		});
	}
	// Gets all players without team
	getTeamLessPlayers() {
		let vm = this;
		return new Promise(function (resolve, reject) {
			vm.client.get('/api/players/teamless')
				.then(response => resolve(JSON.parse(response.response)))
				.catch(error => reject(JSON.parse(error.response)));
		});
	}
	// Verify that a player's id doesnt already exists
	checkPlayer(riot_id) {
		let vm = this;
		return new Promise(function (resolve, reject) {
			vm.client.get('/api/players/validate-id/' + riot_id)
				.then(response => resolve(), error => reject(JSON.parse(error.response)));
		});
	}
	// Add a player to a team
	addTeamToPlayer(player_id, team_id) {
		let vm = this;
		return new Promise(function (resolve, reject) {
			vm.client.post('/api/players/join-team', {player_id: player_id, team_id: team_id})
				.then(response => resolve(JSON.parse(response.response)))
				.catch(error => reject(error.response));
		});
	}
	// Gets a list of the most recently added players
	latestPlayers(number: number) {
		let vm = this;
		return new Promise(function (resolve, reject) {
			vm.client.get('/api/players/latest/' + number)
				.then(response => resolve(JSON.parse(response.response)))
				.catch(error => reject(error.response));
		});
	}
	
	// FILTRES
	getTops() {
		let vm = this;
		return new Promise(function (resolve, reject) {
			vm.client.get('/api/players/position/top')
				.then(response => resolve(JSON.parse(response.response)))
				.catch(error => reject(error.response));
		});
	}
	getJungles() {
		let vm = this;
		return new Promise(function (resolve, reject) {
			vm.client.get('/api/players/position/jungle')
				.then(response => resolve(JSON.parse(response.response)))
				.catch(error => reject(error.response));
		});
	}
	getMids() {
		let vm = this;
		return new Promise(function (resolve, reject) {
			vm.client.get('/api/players/position/mid')
				.then(response => resolve(JSON.parse(response.response)))
				.catch(error => reject(error.response));
		});
	}
	getAdcs() {
		let vm = this;
		return new Promise(function (resolve, reject) {
			vm.client.get('/api/players/position/adc')
				.then(response => resolve(JSON.parse(response.response)))
				.catch(error => reject(error.response));
		});
	}
	getSupports() {
		let vm = this;
		return new Promise(function (resolve, reject) {
			vm.client.get('/api/players/position/support')
				.then(response => resolve(JSON.parse(response.response)))
				.catch(error => reject(error.response));
		});
	}
}
