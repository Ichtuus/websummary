import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { SECRET_CLIENT_ID, SECRET_CLIENT_SECRET } from '$env/static/private';
import { actions } from '../+page.server';

export const GET = async ({ url, cookies }) => {
	const code = await url.searchParams.get('code');

	if (!code) {
		throw redirect(303, '/');
	}

	const tokens = await actions.getToken(code);

	const userInfo = await actions.verifyIdToken(tokens.id_token as string);

	cookies.set('access_token', tokens.access_token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		maxAge: 3600 // 1 heure
	});

	cookies.set('id_token', tokens.id_token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		maxAge: 3600 // 1 heure
	});

	throw redirect(303, '/dashboard');
};
