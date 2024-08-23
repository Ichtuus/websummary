export const load = async ({ fetch }) => {
	const response = await fetch('/dashboard/summaries');
	const result = await response.json();
	console.log('resulmt', result);
	return {
		props: {
			prediction: result
		}
	};
};
