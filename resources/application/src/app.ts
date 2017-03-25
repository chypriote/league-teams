import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = '';
    config.map([
      { route: ['', 'home'],				moduleId: 'players/list',		 name:'home', 			nav: true, title: 'Joueurs' },
      { route: '/:page',        		moduleId: 'players/list',    name:'page',       title: 'Page' },
      { route: 'joueurs/sans-team', moduleId: 'players/noteam',  name:'team-less', 	nav: true, title: 'Teamless' },
      { route: 'equipes',						moduleId: 'teams/list',      name:'teams', 			nav: true, title: 'Equipes' },
      { route: 'filtrer',						moduleId: 'filters/filters', name:'filters',		nav: true, title: 'Filtrer' },
      { route: 'admin',	            moduleId: 'admin/admin',     name:'admin', 	    nav: false, title: 'Administration' },
      { route: 'joueurs/:id',				moduleId: 'details/player',	 name:'player',      title: 'Joueur' },
      { route: 'joueurs/:id/edit',  moduleId: 'details/edit',		 name:'player-edit', title: 'Editer' },
      { route: 'equipes/:id',				moduleId: 'teams/team',      name:'team',        title: 'Equipe' }
    ]);

    this.router = router;
  }
}
