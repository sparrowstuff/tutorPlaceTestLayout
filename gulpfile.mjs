// --- импорты ---
import { src, dest, series, parallel, watch } from 'gulp'
import { deleteAsync } from 'del'
import browserSyncPkg from 'browser-sync'
const browserSync = browserSyncPkg.create()
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import terser from 'gulp-terser'
import imagemin from 'gulp-imagemin'
import mozjpeg from 'imagemin-mozjpeg'
import pngquant from 'imagemin-pngquant'
import svgo from 'imagemin-svgo'
import webp from 'gulp-webp'
import newer from 'gulp-newer'
import svgSprite from 'gulp-svg-sprite'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import gulpIf from 'gulp-if'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

// --- аргументы командной строки ---
const argv = yargs(hideBin(process.argv)).argv
const isProd = argv.prod

// --- пути ---
const paths = {
	base: '.',
	dist: 'dist',
	html: { src: './*.html', dest: 'dist/' },
	css: { src: 'css/**/*.css', dest: 'dist/css' },
	js: { src: 'js/**/*.js', dest: 'dist/js' },
	images: { src: 'images/**/*.{png,jpg,jpeg,svg,gif}', dest: 'dist/images' },
	raster: { src: 'images/**/*.{png,jpg,jpeg}', dest: 'dist/images' },
	fonts: { src: 'fonts/**/*', dest: 'dist/fonts' },
	favicon: { src: 'favicon/**/*', dest: 'dist/favicon' },
	manifest: { src: 'site.webmanifest', dest: 'dist/' },
	svgIcons: { src: 'svg/**/*.svg', dest: 'images/' },
}

// --- helpers ---
function onError(title) {
	return plumber({
		errorHandler: notify.onError(`${title}: <%= error.message %>`),
	})
}

// --- clean ---
export function clean() {
	return deleteAsync(paths.dist)
}

// --- html ---
export function html() {
	return src(paths.html.src).pipe(onError('HTML')).pipe(dest(paths.html.dest))
}

// --- css ---
export function styles() {
	const plugins = [autoprefixer()]
	if (isProd) plugins.push(cssnano())

	return src(paths.css.src, { sourcemaps: !isProd })
		.pipe(onError('CSS'))
		.pipe(postcss(plugins))
		.pipe(dest(paths.css.dest, { sourcemaps: '.' }))
}

// --- js ---
export function scripts() {
	return src(paths.js.src)
		.pipe(onError('JS'))
		.pipe(gulpIf(isProd, terser()))
		.pipe(dest(paths.js.dest))
}

// --- images ---
export function images() {
	return src(paths.images.src)
		.pipe(newer(paths.images.dest))
		.pipe(
			imagemin([
				mozjpeg({ quality: 80, progressive: true }),
				pngquant({ quality: [0.7, 0.85] }),
				svgo(),
			])
		)
		.pipe(dest(paths.images.dest))
}

// --- webp ---
export function toWebp() {
	return src(paths.raster.src)
		.pipe(newer({ dest: paths.images.dest, ext: '.webp' }))
		.pipe(
			gulpIf(file => /\.(png|jpe?g)$/i.test(file.path), webp({ quality: 80 }))
		)
		.pipe(dest(paths.images.dest))
}

// --- assets ---
export function assets() {
	return src([paths.fonts.src, paths.favicon.src, paths.manifest.src], {
		base: '.',
	}).pipe(dest(paths.dist))
}

// --- svg sprite ---
export function sprite() {
	return src(paths.svgIcons.src)
		.pipe(
			svgSprite({
				mode: { symbol: { sprite: '../sprite.auto.svg' } },
				shape: {
					transform: [
						{
							svgo: {
								plugins: [
									{ name: 'removeAttrs', params: { attrs: '(fill|stroke.*)' } },
								],
							},
						},
					],
				},
			})
		)
		.pipe(dest(paths.svgIcons.dest))
}

// --- watch ---
export function watchFiles() {
	watch('*.html', html).on('change', browserSync.reload)
	watch('css/**/*.css', styles).on('change', browserSync.reload)
	watch('js/**/*.js', scripts).on('change', browserSync.reload)
}

// --- dev server ---
export function serve(done) {
	browserSync.init({
		server: { baseDir: '.' },
		open: false,
		notify: false,
	})
	done()
}

// --- build ---
const build = series(
	clean,
	parallel(html, styles, scripts, images, toWebp, assets)
)

// --- dev task ---
export const dev = series(build, serve, watchFiles)

// --- exports ---
export { build }
export default dev
