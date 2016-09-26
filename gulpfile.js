var gulp = require('gulp');
var g = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[\-.]/
});

var SOURCE_DIR = 'resources/';
var OUTPUT_DIR = 'public/';

gulp.task('styles', function () {
	gulp.src([SOURCE_DIR + 'less/main.less'])
		.pipe(g.plumber({
			errorHandler: function (error) {console.log(error.message);this.emit('end');}
		}))
		.pipe(g.stylelint({reporters: [{formatter: 'string', console: true}]}))
		.pipe(g.less())
		.pipe(g.autoprefixer('last 2 versions'))
		.pipe(g.rename({suffix: '.min'}))
		.pipe(g.cssnano())
		.pipe(gulp.dest(OUTPUT_DIR + 'css/'));
});

gulp.task('clean', function () {
	clean([
		'public/**/*',
		'!public',
		'!public/index.php'
	]);
});

gulp.task('build', function () {
	runSequence(['styles']);
});

gulp.task('watch', function () {
	gulp.watch(SOURCE_DIR + 'less/**/*.less', ['styles']);
	//gulp.watch('src/js/**/*.js', ['browserify']);
	//gulp.watch('src/js/**/*.tpl.html', ['copy']);
	//gulp.watch(['src/**/*.html', 'src/fonts/**/*', 'src/img/**/*', 'src/libs/**/*'], ['copy']);
});

gulp.task('default', ['build', 'serve', 'watch'], function () {
});
