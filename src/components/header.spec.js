import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import Header from './header.svelte';

describe('Header', () => {
	it('Should be rendered login modal', async () => {
		render(Header);
		const user = userEvent.setup();
		const btn = screen.getByRole('button', { name: 'Log in' });

		expect(screen.queryByTestId('modal-signup')).not.toBeInTheDocument();

		await user.click(btn);
		const modalSignup = await screen.findByTestId('modal-signup');

		expect(modalSignup).toBeInTheDocument();
	});
});
