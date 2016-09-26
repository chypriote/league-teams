import * as gulp from 'gulp';
import * as plumber from 'gulp-plumber';
import * as sourcemaps from 'gulp-sourcemaps';
import * as stylelint from 'gulp-stylelint';
import * as less from 'gulp-less';
import * as autoprefixer from 'gulp-autoprefixer';
import * as cssnano from 'gulp-cssnano';
import * as rename from 'gulp-rename';
import * as project from '../aurelia.json';
import {build} from 'aurelia-cli';

export default function processCSS() {
  return gulp.src(project.cssProcessor.entry)
  	.pipe(plumber({
			errorHandler: function (error) {console.log(error.message);this.emit('end');}
		}))
    .pipe(sourcemaps.init())
    .pipe(stylelint({reporters: [{formatter: 'string', console: true}]}))
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(project.cssProcessor.target));
};
