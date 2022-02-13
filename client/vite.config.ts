import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// @ts-ignore path alias gives error but is ok
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte()],
	resolve: {
		alias: {
			$components: path.resolve(__dirname, './src/components'),
			$assets: path.resolve(__dirname, './src/assets'),
		},
	},
});
