import {Router, RouterConfiguration} from 'aurelia-router';

export class Admin {
	router: Router;

	configureRouter(config: RouterConfiguration, router: Router){
		config.map([
			{ route: [''],				      moduleId: 'admin/pages/home',    name: 'admin-home',   nav: true, title: 'Tableau de bord' },
			{ route: 'players/add',	    moduleId: 'admin/pages/player-add',    name:'player-add',    nav: true, title: 'Ajouter un joueur' },
			{ route: 'teams/add',       moduleId: 'admin/pages/team-add',    name:'team-add', 	    nav: true, title: 'Ajouter une équipe' },
			{ route: 'teams/edit/:id?',  moduleId: 'admin/pages/team-edit',    name:'team-edit', 	  nav: true, title: 'Editer équipe', href: '#/admin/teams/edit' }
		]);

		this.router = router;
	}
}
