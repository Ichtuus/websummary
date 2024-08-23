import { json, type RequestEvent } from '@sveltejs/kit';
import { temporarySummariesProvider } from '$lib/temporarySummaries/services/temporarySummariesProvider.provider';
import prisma from '$lib/prisma';
import { actions } from '../../+page.server';

export const GET = async ({ url }) => {
	return json(temporarySummariesProvider.getSummaries());
};

export const POST = async (event: RequestEvent) => {
	try {
		const data = await event.request.json();
		const { title, prediction, id, url } = data.prediction;
		const accessToken = event.cookies.get('access_token');

		if (!title || !prediction || !id || !url || !accessToken) {
			return json({ message: 'Missing required fields.' }, { status: 400 });
		}

		const userInfo = await actions.getUserInfo(accessToken);
		const user = await prisma.user.findUnique({
			where: {
				email: userInfo.email
			}
		});

		if (!user) {
			return json({ message: 'User not found.' }, { status: 404 });
		}

		const existingSummary = await prisma.summaries.findFirst({
			where: {
				predictionId: id 
			}
		});

		if (existingSummary) {
			return json({ message: 'Summary already exists.' }, { status: 409 }); 
		}

		await prisma.summaries.create({
			data: {
				predictionId: id,
				predictionText: prediction,
				predictionUrl: url,
				predictionTitle: title,
				author: {
					connect: { id: user.id }
				}
			}
		});

		temporarySummariesProvider.removeSummary(id)
		return json({ message: 'Summary added successfully.' }, { status: 200 });
	} catch (error) {
		console.error('Error while adding summary:', error);
		return json({ message: 'An error occurred while adding the summary.' }, { status: 500 });
	}
};
