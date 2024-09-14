export const load = async ({ fetch }) => {
	const response = await fetch('/dashboard/summaries');
	const result = await response.json();
	console.log('/dashboard/summaries result', result);
	return {
		props: {
			temporariesPrediction: result.temporariesPrediction,
			summaries: result.summaries
		}
	};
};
