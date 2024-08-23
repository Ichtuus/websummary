import { GCP_LOCATION, GCP_PROJECT_ID, AI_PROMPT } from '$env/static/private';
import { json, type RequestEvent } from '@sveltejs/kit';

import { VertexAI } from '@google-cloud/vertexai';
import { temporarySummariesProvider } from '$lib/temporarySummaries/services/temporarySummariesProvider.provider';


const vertex_ai = new VertexAI({
	project: GCP_PROJECT_ID,
	location: GCP_LOCATION
});
const model = 'gemini-1.5-flash-001';

const generativeModel = vertex_ai.preview.getGenerativeModel({
	model,
	generationConfig: {
		maxOutputTokens: 2048,
		temperature: 0.5,
		topP: 0.2,
		topK: 5
	},
	safetySettings: []
});

async function getSummary(text: any) {
	const prompt = `${AI_PROMPT}\n\n`;

	const req = {
		contents: [
			{
				role: 'user',
				parts: [
					{
						text: `${prompt}${text}`
					}
				]
			}
		]
	};

	const resp = await generativeModel.generateContent(req);
	const summary = resp.response.candidates[0].content.parts[0].text;

	return summary;
}

export const POST = async (event: RequestEvent) => {
	const { srctext, srctitle, srcurl } = await event.request.json();
	// const prediction = await getSummary(srctext);
	const prediction =
		'Arthur Cadre, danseur, contorsionniste et architecte français, est l\'artiste principal de la cérémonie de clôture des Jeux olympiques de Paris 2024. Ce performer hors du commun, connu pour ses acrobaties extraordinaires, incarne le "golden voyageur" dans le spectacle imaginé par Thomas Jolly. Cadre, qui a déjà participé à des événements de grande envergure comme La Perle à Dubaï, est un artiste polyvalent et reconnu, ayant travaillé dans le monde entier. Il a accepté la proposition de Jolly deux mois avant le spectacle, attiré par la liberté créative offerte et la possibilité de collaborer avec un artiste qu\'il admire.';
	const isSummaryAdded = temporarySummariesProvider.addSummary({ prediction, srctitle, srcurl });

	if (!isSummaryAdded) {
		return json({ message: 'Conflict: Summary already exists.' }, { status: 409 });
	}


	return json({ prediction });
};
