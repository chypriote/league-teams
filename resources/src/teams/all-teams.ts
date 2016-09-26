import {HttpClient} from 'aurelia-fetch-client';

export class AllTeams {
	teams;
	selectedId = 0;

	constructor() {
	}

  created() {
		let client = new HttpClient();
		client.fetch('api/teams')
			.then(response => response.json())
			.then(data => this.teams = data);
  }

}
