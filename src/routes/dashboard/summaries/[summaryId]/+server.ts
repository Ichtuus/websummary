import { json } from '@sveltejs/kit';
import { temporarySummariesProvider } from '../../../../lib/temporarySummaries/services/temporarySummariesProvider.provider';
import { summariesProviderService } from '$lib/summaries/services/summariesProvider.provider';

export const DELETE = async ({ params, url }) => {
	const { summaryId } = params;
	const mode = url.searchParams.get('mode');

	if (mode === 'summary') {
		await summariesProviderService.removeSummary(+summaryId);

		return json({ message: 'Summary removed successfully.' }, { status: 200 });
	} else {
		temporarySummariesProvider.removeSummary(summaryId);
		return json({ message: 'Temporary summary removed successfully.' }, { status: 200 });
	}
};
