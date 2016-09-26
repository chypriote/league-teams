import {Router} from 'aurelia-router';

export class Navigation {
  router: Router;
  activeRoute = '';

  constructor() {}

  setActive(route) {
  	this.activeRoute = route;
  	return true;
  }
  isActive(route) {
  	return this.activeRoute === route;
  }
}
