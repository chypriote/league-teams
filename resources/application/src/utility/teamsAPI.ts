import {HttpClient} from 'aurelia-http-client';

export class TeamsAPI {
	client: HttpClient;

	constructor() {
		this.client = new HttpClient();
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
	deleteTeam(id) {
		let vm = this;
		return new Promise(function (resolve, reject) {
			vm.client.delete('/api/teams/' + id)
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
