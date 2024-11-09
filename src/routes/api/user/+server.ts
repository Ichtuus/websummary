import { json, type RequestEvent } from '@sveltejs/kit';
import { prisma } from '@/lib/prisma';
import { actions } from '@/routes/+page.server';

export const GET = async (event: RequestEvent) => {
	const accessToken = event.cookies.get('access_token');
	const userInfo = await actions.getUserInfo(accessToken as string);

	const user = await prisma.user.findUnique({
		where: { email: userInfo.email },
		select: {
			id: true,
			name: true,
			email: true,
			createdAt: true
		}
	});

	if (!user) {
		return json({ error: 'User not found' }, { status: 404 });
	}

	return json(user);
};
