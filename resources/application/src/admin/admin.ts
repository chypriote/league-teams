import {Router, RouterConfiguration} from 'aurelia-router';

export class Admin {
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router){
        config.map([
            { route: [''],				  moduleId: 'admin/home',		    name: 'admin-home',   nav: true, title: 'Tableau de bord' },
            { route: 'players/add',	moduleId: 'admin/player-add',	name:'player-add',    nav: true, title: 'Ajouter un joueur' },
            { route: 'teams/add',   moduleId: 'admin/team-add',		name:'team-add', 	    nav: true, title: 'Ajouter une équipe' }
        ]);

        this.router = router;
    }
}
