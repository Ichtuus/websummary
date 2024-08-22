import { json } from '@sveltejs/kit';
import { temporarySummariesProvider } from '../../../../lib/mysummaries/services/temporarySummariesProvider.provider';

export const DELETE = async ({ params }) => {
	console.log('AHhhhHHH');
	const { summaryId } = params;
	console.log('delete', summaryId);
	temporarySummariesProvider.removeSummary(summaryId);

	return json({ message: 'Summary deleted successfully.' });
};
