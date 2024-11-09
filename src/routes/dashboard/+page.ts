export const load = async ({ fetch }) => {
	const response = await fetch('/api/user');
	const result = await response.json();

	return {
		props: {
			user: result
		}
	};
};
