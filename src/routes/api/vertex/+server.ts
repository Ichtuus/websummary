import { GCP_LOCATION, GCP_PROJECT_ID, AI_PROMPT } from '$env/static/private';
import { json, type RequestEvent } from '@sveltejs/kit';

import { VertexAI } from '@google-cloud/vertexai';
import { provideData } from '$lib/utils';

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
	const requestData = await event.request.json();
	const prediction = await getSummary(requestData);
	provideData.push({prediction})
	return json({ prediction });
};
