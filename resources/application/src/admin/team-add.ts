import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {TeamsAPI} from '../utility/teamsAPI';
import {TeamAdded} from "../utility/events";

@inject(EventAggregator)
export class TeamAdd {
	api = new TeamsAPI;
	name; tag; logo;
	error; success;
	
	constructor(private ea: EventAggregator) {}

	submitTeam() {
		let vm = this;

		this.error = null;
		this.success = null;

		let team = {
			name: this.name,
			tag: this.tag,
			logo: this.logo
		};

		this.api.addTeam(team)
			.then(function () {
				vm.name = null;
				vm.logo = null;
				vm.success = true;
				vm.ea.publish(new TeamAdded(team));
			}, function (error) {
				vm.error = '[' + error.response + '] Impossible de sauvegarder l\'équipe';
			});
	}
}