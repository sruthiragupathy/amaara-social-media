module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				body: ['Montserrat'],
				ital: ['Montserrat:ital'],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
