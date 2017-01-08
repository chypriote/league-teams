import * as gulp from 'gulp';
import * as plumber from 'gulp-plumber';
import * as sourcemaps from 'gulp-sourcemaps';
import * as less from 'gulp-less';
import * as stylelint from 'gulp-stylelint';
import * as autoprefixer from 'gulp-autoprefixer';
import * as cssnano from 'gulp-cssnano';
import * as uncomment from 'gulp-strip-css-comments';
import * as project from '../aurelia.json';
import {build} from 'aurelia-cli';

export default function processCSS() {
  return gulp.src(project.cssProcessor.entry)
  	.pipe(plumber({
			errorHandler: function (error) {console.log(error.message);this.emit('end');}
		}))
    .pipe(stylelint({reporters: [{formatter: 'string', console: true}]}))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(uncomment({preserve:false}))
    .pipe(cssnano())
    .pipe(build.bundle());
};
