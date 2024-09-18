import { redirect } from '@sveltejs/kit';
import { actions } from '../+page.server';
import { prisma, userService } from '$lib/prisma';

export const GET = async ({ url, cookies }) => {
	const code = await url.searchParams.get('code');

	if (!code) {
		throw redirect(303, '/');
	}

	const tokens = await actions.getToken(code);

	const userInfo = await actions.verifyIdToken(tokens.id_token as string);
	// const user = await userService.getUser(userInfo);

	const user = prisma.user.findUnique({
		where: {
			email: userInfo?.email
		}
	});

	if (!user) {
		await prisma.user.create({
			data: {
				name: userInfo?.name as string,
				email: userInfo?.email as string,
				access_token: tokens.access_token as string,
				id_token: tokens.id_token as string
			}
		});
	} else {
		await prisma.user.update({
			where: {
				email: userInfo?.email
			},
			data: {
				access_token: tokens.access_token as string,
				id_token: tokens.id_token as string
			}
		});
	}

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
