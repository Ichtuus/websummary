import { provideData } from '$lib/utils';
import { json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	console.log('RESUME', provideData);
	return json(provideData);
};
