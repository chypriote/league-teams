import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = '';
    config.map([
      { route: ['', 'home'],				moduleId: 'players/list',		 name:'home', 			nav: true, title: 'Joueurs' },
      { route: 'home/:page',        moduleId: 'players/list',    name:'page',       title: 'Page' },
      { route: 'teams', 					  moduleId: 'teams/list',      name:'teams', 			nav: true, title: 'Equipes' },
      { route: 'players/sans-team', moduleId: 'players/noteam',  name:'team-less', 	nav: true, title: 'Teamless' },
      { route: 'all',               moduleId: 'players/all',     name:'all',        nav: true, title: 'Tous' },
      { route: 'admin',	            moduleId: 'admin/admin',     name:'admin', 	    nav: false, title: 'Administration' },
      { route: 'players/:id',				moduleId: 'details/player',	 name:'player',      title: 'Joueur' },
      { route: 'players/:id/edit',  moduleId: 'details/edit',		 name:'player-edit', title: 'Editer' },
      { route: 'teams/:id',         moduleId: 'teams/team',      name:'team',        title: 'Equipe' }
    ]);

    this.router = router;
  }
}
