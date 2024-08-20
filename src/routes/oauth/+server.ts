import { redirect } from '@sveltejs/kit';
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
