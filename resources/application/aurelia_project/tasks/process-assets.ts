import * as gulp from 'gulp';
import * as plumber from 'gulp-plumber';
import * as changedInPlace from 'gulp-changed-in-place';
import * as imagemin from 'gulp-imagemin';
import * as project from '../aurelia.json';
import {build} from 'aurelia-cli';

export default function processAssets() {
	return gulp.src(project.assetsProcessor.source)
		.pipe(plumber({
			errorHandler: function (error) {console.log(error.message);this.emit('end');}
		}))
		.pipe(changedInPlace({firstPass:true}))
		.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				optimizationLevel: 4,
				multipass: true,
				interlaced: true
		}))
		.pipe(gulp.dest(project.assetsProcessor.target));
};
