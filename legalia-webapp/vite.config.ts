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
			target: 'http://localhost:8000',
			changeOrigin: true
		  },
		  '/search/sentenze/documents': {
        	target: 'http://localhost:8000',
     		changeOrigin: true
      		},
			'/search/sentenze/reranker': {
        	target: 'http://localhost:8000',
     		changeOrigin: true
      		},
			'/search/sentenze/analysis': {
        	target: 'http://localhost:8000',
     		changeOrigin: true
      		},
			'/search/chat': {
        	target: 'http://localhost:8000',
     		changeOrigin: true
      		},
			'/search/norme/': {
        	target: 'http://localhost:8000',
     		changeOrigin: true
      		},
			'/chat/create/': {
        	target: 'http://localhost:8000',
     		changeOrigin: true,
      		},
			'/chat/complete': {
        	target: 'http://localhost:8000',
     		changeOrigin: true,
      		},
			'/chat/all': {
        	target: 'http://localhost:8000',
     		changeOrigin: true,
      		},
			'/chat/get/': {
        	target: 'http://localhost:8000',
     		changeOrigin: true,
      		},
			'/project/': {
        	target: 'http://localhost:8000',
     		changeOrigin: true,
      		},
			'/project/add': {
        	target: 'http://localhost:8000',
     		changeOrigin: true,
      		},
			'/project/toggle/': {
        	target: 'http://localhost:8000',
     		changeOrigin: true,
      		},
			'/files/all': {
        	target: 'http://localhost:8000',
     		changeOrigin: true,
      		},
			'/files/upload': {
        	target: 'http://localhost:8000',
     		changeOrigin: true,
      		},
			'/generate/defense': {
        	target: 'http://localhost:8000',
     		changeOrigin: true
			},
			'/generate/report': {
        	target: 'http://localhost:8000',
     		changeOrigin: true
			}
		}
	}
});
