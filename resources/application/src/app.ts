import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = '';
    config.map([
      { route: ['', 'home'],				moduleId: 'players/player-list',		name: 'home', 			nav: true, title: 'Accueil' },
      { route: 'teams', 						moduleId: 'teams/team-list',				name:'teams', 			nav: true, title: 'Equipes' },
      { route: 'players/add',				moduleId: 'players/player-add',			name:'player-add', 	nav: true, title: 'Ajouter un joueur' },
      { route: 'teams/add',					moduleId: 'teams/team-add',					name:'team-add', 		nav: true, title: 'Ajouter une équipe' },
      { route: 'players/:id',				moduleId: 'players/player-details',	name:'player', 			title: 'Joueur' },
      { route: 'players/:id/edit',	moduleId: 'players/player-edit',		name:'player-edit', title: 'Editer un joueur' },
    ]);

    this.router = router;
  }
}
