/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './nuxt.config.{js,ts}', './app.vue'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],
	daisyui: {
		theme: 'cupcake',
		darkMode: false,
		themes: ['cupcake']
	},
	safelist: ['alert-warning', 'alert-error', 'alert-success', 'alert-info']
}
