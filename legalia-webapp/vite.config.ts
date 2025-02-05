import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

const isProduction = process.env.NODE_ENV === 'prod';
const port = isProduction ? 80 : 8080;

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		host: '0.0.0.0',
		port: port,
		allowedHosts: ["legalia.cloud"]
	}
});
