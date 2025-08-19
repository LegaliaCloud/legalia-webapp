import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		proxy: {
			'/search/document': {
				target: 'http://www.legalia.cloud:8000',
				changeOrigin: true
			},
			'/search/sentenze/documents': {
				target: 'http://www.legalia.cloud:8000',
				changeOrigin: true
			},
			'/search/sentenze/reranker': {
				target: 'http://www.legalia.cloud:8000',
				changeOrigin: true
			},
			'/search/sentenze/analysis': {
				target: 'http://www.legalia.cloud:8000',
				changeOrigin: true
			},
			'/search/chat': {
				target: 'http://www.legalia.cloud:8000',
				changeOrigin: true
			},
			'/search/norme/': {
				target: 'http://www.legalia.cloud:8000',
				changeOrigin: true
			},
			'/chat/create/': {
				target: 'http://www.legalia.cloud:8000',
				changeOrigin: true
			},
			'/chat/complete': {
				target: 'http://www.legalia.cloud:8000',
				changeOrigin: true
			},
			'/chat/all': {
				target: 'http://www.legalia.cloud:8000',
				changeOrigin: true
			},
			'/chat/get/': {
				target: 'http://www.legalia.cloud:8000',
				changeOrigin: true
			},
			'/project/': {
				target: 'http://www.legalia.cloud:8000',
				changeOrigin: true
			},
			'/project/add': {
				target: 'http://www.legalia.cloud:8000',
				changeOrigin: true
			},
			'/project/toggle/': {
				target: 'http://www.legalia.cloud:8000',
				changeOrigin: true
			},
			'/files/all': {
				target: 'http://www.legalia.cloud:8000',
				changeOrigin: true
			},
			'/files/upload': {
				target: 'http://www.legalia.cloud:8000',
				changeOrigin: true
			},
			'/generate/defense': {
				target: 'http://www.legalia.cloud:8000',
				changeOrigin: true
			},
			'/generate/report': {
				target: 'http://www.legalia.cloud:8000',
				changeOrigin: true
			},
			'/safeguard/projects/': {
				target: 'http://www.legalia.cloud:8000',
				changeOrigin: true
			},
			'/safeguard/attention-points/': {
				target: 'http://www.legalia.cloud:8000',
				changeOrigin: true
			}
		},
		host: '0.0.0.0',
		port: 5173,
		allowedHosts: [
		'localhost',
		'127.0.0.1',
		'localhost'
		]
	}
});
