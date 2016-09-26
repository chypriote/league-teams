import {HttpClient} from 'aurelia-fetch-client';

export class TeamDetails {
	message = 'Teams';
	team;

	constructor() {
	}

	created() {
		let client = new HttpClient();
		client.fetch('api/team/')
			.then(response => response.json())
			.then(data => this.team.data);
	}
}
