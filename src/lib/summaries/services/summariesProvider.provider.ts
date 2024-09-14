import { prisma } from '$lib/prisma';
import { actions } from '../../../routes/+page.server';

class SummariesProviderService {
	constructor() {}

	public async getSummaries(accessToken: string) {
		const userInfo = await actions.getUserInfo(accessToken);

		const user = await prisma.user.findUnique({
			where: { email: userInfo.email },
			include: { summaries: true }
		});

		if (!user) {
			console.log('User not found');
			return [];
		}
		return user.summaries;
	}

	public async removeSummary(summaryId: number) {
		await prisma.summaries.delete({
			where: { id: summaryId }
		});
	}
}

export const summariesProviderService = new SummariesProviderService();
