import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch, session }) => {
	const response = await fetch('/api/oauth/verify');
	const result = await response.json();

	if (!result.connected) {
		throw redirect(303, '/');
	}

	return {
		props: {
			user: result.user
		}
	};
};
