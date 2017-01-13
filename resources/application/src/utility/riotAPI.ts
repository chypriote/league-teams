import {HttpClient} from 'aurelia-fetch-client';

export class RiotAPI {
	api_url = 'https://euw.api.pvp.net/api/lol/euw/';
	api_key = '4cc2723d-f13c-41dc-85ce-fe5c89534640';
	client: HttpClient;

	constructor() {
		this.client = new HttpClient();
	}

	summonerById(id: number) {
		let vm = this;
		let url = this.api_url + 'v1.4/summoner/' + id +'?api_key=' + this.api_key;
		return new Promise(function (resolve, reject) {
			vm.client.fetch(url)
				.then(response => response.json())
				.then(function (data) {
					resolve(data[id]);
				}, error => reject(error));
		});
	}

	summonerByName(name: string) {
		let vm = this;
		let url = this.api_url + 'v1.4/summoner/by-name/' + name +'?api_key=' + this.api_key;
		return new Promise(function (resolve, reject) {
			vm.client.fetch(url)
				.then(response => response.json())
				.then(function (data) {
					resolve(data[name.toLowerCase().replace(/ /g, '')]);
				}, error => reject(error));
		});
	}

	summonerLeague(id: number) {
		let vm = this;
		let url = this.api_url + 'v2.5/league/by-summoner/' + id + '/entry?api_key=' + this.api_key;
		return new Promise(function (resolve, reject) {
			vm.client.fetch(url)
				.then(response => response.json())
				.then(function (data) {
					resolve(data[id]);
				}, error => reject(error));
		});
	}
}
