import adapter from '@sveltejs/adapter-auto';
import { sveltePreprocess } from 'svelte-preprocess';
import path from 'path';

const config = {
	preprocess: sveltePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			'@': path.resolve('./src')
		}
	}
};

export default config;
