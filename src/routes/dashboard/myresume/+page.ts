export const load = async ({ fetch }) => {
	const response = await fetch('/dashboard/myresume');
	const result = await response.json();

	return {
		props: {
			prediction: result
		}
	};
};
