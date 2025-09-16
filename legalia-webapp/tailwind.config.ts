import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			typography: {
				DEFAULT: {
				css: {
					color: '#000000',           // Testo normale
					a: {
					color: '#000000',
					'&:hover': { color: '#000000' },
					},
					strong: { color: '#000000' },
					h1: { color: '#000000' },
					h2: { color: '#000000' },
					h3: { color: '#000000' },
					h4: { color: '#000000' },
					h5: { color: '#000000' },
					h6: { color: '#000000' },
					li: { color: '#000000' },
					'li::marker': { color: '#000000' },
				}
				}
			}
		}
	},

	plugins: [require('@tailwindcss/typography'), require('daisyui')]
} as Config;
