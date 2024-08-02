import { redirect } from '@sveltejs/kit';

import { OAuth2Client } from 'google-auth-library';
import { SECRET_CLIENT_ID, SECRET_CLIENT_SECRET } from '$env/static/private';

const redirectURL = 'http://localhost:5173/oauth';
const oAuth2Client = new OAuth2Client(SECRET_CLIENT_ID, SECRET_CLIENT_SECRET, redirectURL);

export const actions = {
	OAuth2: async ({}) => {
		const authorizeURL = oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
			prompt: 'consent'
		});
		console.log('on est la');
		throw redirect(302, authorizeURL);
	},

	verifyIdToken: async (idToken: string) => {
		const ticket = await oAuth2Client.verifyIdToken({
			idToken,
			audience: SECRET_CLIENT_ID
		});
		return ticket.getPayload();
	},

	getToken: async (code: string) => {
		const { tokens } = await oAuth2Client.getToken(code);
		oAuth2Client.setCredentials(tokens);
		return tokens;
	}
};
