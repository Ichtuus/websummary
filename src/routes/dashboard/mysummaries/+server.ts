import { json } from '@sveltejs/kit';
import { temporarySummariesProvider } from '$lib/mysummaries/services/temporarySummariesProvider.provider';

export const GET = async ({ url }) => {
	console.log('SUMMARY', temporarySummariesProvider.getSummaries());

	return json(temporarySummariesProvider.getSummaries());
};
