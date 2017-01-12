import {bindable} from 'aurelia-framework';

export class PlayerMates {
	@bindable teammates;
	@bindable pid;
	
	constructor() {	}
	
	setImages(player) {
		return {
			rank: '/assets/tiers/32/' + player.tier.toLowerCase() + '.png',
			role: '/assets/roles/32/' + player.position + '.png',
		}
	}
	
	teammatesChanged() {
		let vm = this;
		
		vm.teammates.forEach(function (player) {
			player.images = vm.setImages(player);
			return player
		});
	}
	
	attached() {
		let vm = this;
		
		vm.teammates.forEach(function (player) {
			player.images = vm.setImages(player);
			return player
		});
	}
}
