import { json, RequestEvent } from '@sveltejs/kit';
import { temporarySummariesProvider } from '../../../../lib/temporarySummaries/services/temporarySummariesProvider.provider';

export const DELETE = async ({ params }) => {
	const { summaryId } = params;
	temporarySummariesProvider.removeSummary(summaryId);
	return json({ message: 'Summary deleted successfully.' });
};
