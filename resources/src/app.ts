import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;

  constructor() {}

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'MyElo';
    config.map([
      { route: '',					moduleId: 'ladder/ladder',			name: 'home', title: 'DB France' },
      { route: 'teams',			moduleId: 'teams/all-teams',		name: 'teams' },
      { route: 'teams/:id', moduleId: 'teams/team-details', name: 'team'},
      { route: 'results',		moduleId: 'games/results',			name: 'results'},
			{ route: 'players/:id',		moduleId: 'player/player-details',			name: 'player'},
			{ route: 'players/add',		moduleId: 'player/add-player',			name: 'player-add'}
    ]);

    this.router = router;
  }
}
