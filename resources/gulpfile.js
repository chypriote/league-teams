var gulp = require('gulp');
var g = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[-.]/
});
var runSequence = require('run-sequence');
var clean = require('del');
var browserSync = require('browser-sync');

gulp.task('styles', function () {
	gulp.src(['styles/main.less'])
		.pipe(g.plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(g.less())
		.pipe(g.autoprefixer('last 2 versions'))
		.pipe(g.rename({suffix: '.min'}))
		.pipe(g.cssnano())
		.pipe(gulp.dest('../public/css/'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('assets', function () {
	return gulp.src(['assets/**/*'])
		.pipe(g.plumber({
			errorHandler: function (error) {console.log(error.message);this.emit('end');}
		}))
		.pipe(g.imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				optimizationLevel: 4,
				multipass: true,
				interlaced: true
		}))
		.pipe(gulp.dest('../public/assets'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('aurelia', function () {
	gulp.src('')
		.pipe(g.shell([
			'au build'
		], {
			cwd: './application'
		}));
});

gulp.task('copy', function () {
	gulp.src(['fonts/*'])
		.pipe(g.changed('../public/fonts/*'))
		.pipe(gulp.dest('../public/fonts'));
	gulp.src(['node_modules/font-awesome/fonts/*'])
		.pipe(gulp.dest('../public/fonts'));
	gulp.src(['node_modules/font-awesome/css/font-awesome.min.css'])
		.pipe(gulp.dest('../public/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('clean', function () {
	// clean(['public/**/*', '!public']);
});

gulp.task('build', function () {
	runSequence(['styles', 'assets', 'aurelia', 'copy']);
});

gulp.task('reload', function () {
	browserSync.reload();
});

gulp.task('serve', function () {
	browserSync({
		proxy: 'players.local',
		online: false
	});
});

gulp.task('watch', function () {
	gulp.watch('styles/**/*.less', ['styles']);
	gulp.watch('assets/**/*', ['assets']);
	gulp.watch('fonts/**/*', ['copy']);
});

gulp.task('default', ['build', 'serve', 'watch'], function () {
});
