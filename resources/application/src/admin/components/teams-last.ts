import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {TeamsAPI} from "../../utility/teamsAPI";
import {TeamAdded} from "../../utility/events";

@inject(EventAggregator)
export class TeamsLast {
	api = new TeamsAPI();
	latest;
	
	constructor(private ea: EventAggregator) {
		ea.subscribe(TeamAdded, msg => this.latest.unshift(msg.team));
	}
		
	attached() {
		let vm = this;
		this.api.latestTeams(10).then(data => {
			vm.latest = data;
			vm.latest.forEach(function (team) {
				if (team.logo) {
					team.image = '/assets/teams/32/' + team.logo + '.png';
				}
				return team
			});
		});
	}
}