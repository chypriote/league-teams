import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = '';
    config.map([
      { route: ['', 'home'],				moduleId: 'players/player-list',		name: 'home', 			nav: true, title: 'Joueurs' },
      { route: 'teams', 					moduleId: 'teams/team-list',			name:'teams', 			nav: true, title: 'Equipes' },
      { route: 'players/sans-team', 		moduleId: 'players/player-noteam',		name:'team-less', 		nav: true, title: 'Teamless' },
      { route: 'players/:id',				moduleId: 'players/player-details',	    name:'player', 			title: 'Joueur' },
      { route: 'players/:id/edit',	        moduleId: 'players/player-edit',		name:'player-edit',     title: 'Editer un joueur' },
      { route: 'admin',				        moduleId: 'admin/admin',			    name:'admin', 	        nav: true, title: 'Administration' }
    ]);

    this.router = router;
  }
}
