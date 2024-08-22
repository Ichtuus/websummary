export const load = async ({ fetch }) => {
	const response = await fetch('/dashboard/mysummaries');
	const result = await response.json();

	return {
		props: {
			prediction: result
		}
	};
};
