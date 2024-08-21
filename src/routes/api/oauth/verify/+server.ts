import { actions } from '../../../+page.server';

export const GET = async ({ cookies }) => {
	const idToken = cookies.get('id_token');

	if (!idToken) {
		return new Response(JSON.stringify({ connected: false }), { status: 401 });
	}

	try {
		// Vérifie le jeton ID pour confirmer l'authenticité
		const userInfo = await actions.verifyIdToken(idToken);

		return new Response(JSON.stringify({ connected: true, user: userInfo }), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Échec de la vérification du jeton :', error);
		return new Response(JSON.stringify({ connected: false }), { status: 401 });
	}
};
