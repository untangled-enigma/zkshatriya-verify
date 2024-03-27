import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	build: {
		target: 'esnext' //browsers can handle the latest ES features
	  },
	optimizeDeps: {
		esbuildOptions: {
			target: 'esnext'
		}
	},
	worker: {
		format: 'es'
	},
	server: {
		host: '0.0.0.0',
		port: 8000,
		headers: {
			"Cross-Origin-Opener-Policy": "same-origin",
			"Cross-Origin-Embedder-Policy": "require-corp"
		}
	},
	plugins: [
		svelte({
			
			/* plugin options */
		})
	]
});