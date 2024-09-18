import type { Summary, TemporaryPrediction } from '@/views/dashboard/types';

export const load = async ({ fetch }) => {
	const response = await fetch('/dashboard/summaries');
	const {
		temporariesPrediction,
		summaries
	}: { temporariesPrediction: TemporaryPrediction[]; summaries: Summary[] } = await response.json();
	console.log('/dashboard/summaries result', temporariesPrediction, summaries);
	return {
		props: { temporariesPrediction, summaries }
	};
};
