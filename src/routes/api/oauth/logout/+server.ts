export const GET = async ({ cookies }) => {
	cookies.delete('access_token', { path: '/' });
	cookies.delete('id_token', { path: '/' });

	return new Response(null, {
		status: 302,
		headers: {
			location: '/'
		}
	});
};
