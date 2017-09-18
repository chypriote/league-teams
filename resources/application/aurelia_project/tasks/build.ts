import * as gulp from 'gulp';
import transpile from './transpile';
import processMarkup from './process-markup';
import * as shell from 'gulp-shell';
import {build} from 'aurelia-cli';
import * as project from '../aurelia.json';

export default gulp.series(
	readProjectConfiguration,
	gulp.parallel(
		transpile,
		processMarkup
	),
	writeBundles,
	moveBundles
);

function readProjectConfiguration() {
	return build.src(project);
}

function writeBundles() {
	return build.dest();
}


function moveBundles() {
  	return gulp.src('index.html')
  		.pipe(shell([
			'mv app-bundle.js ../../public ',
			'mv app-bundle.js.map ../../public',
			'mv vendor-bundle.js ../../public'
		]));
}