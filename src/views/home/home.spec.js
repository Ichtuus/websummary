import { render, screen } from '@testing-library/svelte';
import Home from './home.svelte';

describe('Home', () => {
	it('Should be rendered information', () => {
		render(Home);
		const heading = screen.getByText('Don\'t Read, Summarize!');
		expect(heading).toBeInTheDocument();
	});
});
