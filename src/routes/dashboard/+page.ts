export const load = async ({ fetch }) => {
	const response = await fetch('/api/oauth/verify');
	const result = await response.json();

	return {
		props: {
			user: result.user
		}
	};
};
