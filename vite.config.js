import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import postcss from './postcss.config.js';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
		target: 'esnext' //browsers can handle the latest ES features
	  },
	optimizeDeps: {
		esbuildOptions: {
			target: 'esnext'
		}
	},
  server: {
		headers: {
			"Cross-Origin-Opener-Policy": "same-origin",
			"Cross-Origin-Embedder-Policy": "require-corp"
		}
	},
  css: {
    postcss,
  },
  plugins: [svelte({
    /* plugin options */
  })]
})
