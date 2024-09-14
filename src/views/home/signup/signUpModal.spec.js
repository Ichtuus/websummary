import { render, screen, fireEvent } from '@testing-library/svelte';
import '@testing-library/jest-dom'; // Pour les extensions de matcher comme toBeInTheDocument
import SignupModal from './signUpModal.svelte'; // Votre composant Svelte

describe('SignupModal', () => {
	beforeEach(() => {
		// Configurer un mock pour window.location.assign
		delete window.location;
		window.location = { assign: jest.fn() }; // Mock la fonction de redirection
	});

	it('should submit the form and redirect to the dashboard', async () => {
		// Render le composant avec la propriété `open` définie à `true` pour afficher la modal
		render(SignupModal, { open: true, title: 'Test Modal' });

		// Vérifier que la modal est affichée
		expect(screen.getByText('Test Modal')).toBeInTheDocument();

		// Trouver le bouton submit
		const submitButton = screen.getByRole('button', { name: /sign up with google/i });

		// Simuler la soumission du formulaire en cliquant sur le bouton submit
		await fireEvent.click(submitButton);

		// Vérifier que window.location.assign a été appelé avec l'URL de redirection attendue
		expect(window.location.assign).toHaveBeenCalledWith(expect.stringContaining('/dashboard'));
	});
});
