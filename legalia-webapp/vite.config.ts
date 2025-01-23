import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		proxy: {
		  '/document': {
			target: 'http://localhost:8000',
			changeOrigin: true,
			rewrite: (path) => path.replace(/^\/document/, '/document'),
		  },
		  '/documents': {
        	target: 'http://localhost:8000',
     		changeOrigin: true,
        	rewrite: (path) => path.replace(/^\/documents/, '/documents'),
      		},
			'/reranker': {
        	target: 'http://localhost:8000',
     		changeOrigin: true,
        	rewrite: (path) => path.replace(/^\/reranker/, '/reranker'),
      		},
			'/reasoning': {
        	target: 'http://localhost:8000',
     		changeOrigin: true,
        	rewrite: (path) => path.replace(/^\/reasoning/, '/reasoning'),
      		},
			'/analysis': {
        	target: 'http://localhost:8000',
     		changeOrigin: true,
        	rewrite: (path) => path.replace(/^\/analysis/, '/analysis'),
      		},
			'/chat': {
        	target: 'http://localhost:8000',
     		changeOrigin: true,
        	rewrite: (path) => path.replace(/^\/chat/, '/chat'),
      		}
		}
	}
});
