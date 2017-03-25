import {Router, RouterConfiguration} from 'aurelia-router';

export class Filters {
	router: Router;

	configureRouter(config: RouterConfiguration, router: Router){
		config.map([
			{ route: [''],                moduleId: 'filters/pages/all',    name: 'filter-all',   nav: true, title: 'Tous' },
			{ route: '/tops',	    moduleId: 'filters/pages/top',    name:'filter-top',    nav: true, title: 'Tops' },
			{ route: '/jungle',    moduleId: 'filters/pages/jungle',    name:'filter-jungle',    nav: true, title: 'Junglers' },
			{ route: '/mid',       moduleId: 'filters/pages/mid',    name:'filter-mid',    nav: true, title: 'Mids' },
			{ route: '/adc',       moduleId: 'filters/pages/adc',    name:'filter-adc',    nav: true, title: 'ADC' },
			{ route: '/support',   moduleId: 'filters/pages/support',    name:'filter-support',    nav: true, title: 'Supports' }
		]);

		this.router = router;
	}
}
