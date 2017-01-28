import {HttpClient} from 'aurelia-fetch-client';

export class RiotAPI {
	client: HttpClient;

	constructor() {
		this.client = new HttpClient();
	}

	summonerById(id: number) {
		let vm = this;
		let url = '/api/riot/summoner/' + id;
		return new Promise(function (resolve, reject) {
			vm.client.fetch(url)
				.then(response => response.json())
				.then(data => resolve(data), error => reject(error));
		});
	}

	summonerByName(name: string) {
		let vm = this;
		let url = '/api/riot/summoner/by-name/' + name;
		return new Promise(function (resolve, reject) {
			vm.client.fetch(url)
				.then(response => response.json())
				.then(data => resolve(data), error => reject(error));
		});
	}

	summonerLeague(id: number) {
		let vm = this;
		let url = 'api/riot/summoner/league/' + id;
		return new Promise(function (resolve, reject) {
			vm.client.fetch(url)
				.then(response => response.json())
				.then(data => resolve(data), error => reject(error));
		});
	}
}
