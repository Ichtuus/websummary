<script lang="ts">
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import TemporarySummaries from './temporarySummaries.svelte';
	import Summaries from './summaries.svelte';
	import type { Summary, TemporaryPrediction } from '../types';

	export let data: {
		props: { temporariesPrediction: TemporaryPrediction[]; summaries: Summary[] };
	};

	const triggerRemoveSummaryAction = ({ detail }: CustomEvent) => {
		console.log('summaryId', detail);
		fetch(`/dashboard/summaries/${detail}?mode=summary`, {
			method: 'DELETE'
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Résultat de la suppression:', data);
				// Ici, vous pouvez ajouter une logique pour mettre à jour l'interface utilisateur
				// Par exemple, retirer le résumé supprimé de la liste affichée
			})
			.catch((erreur) => {
				console.error('Erreur lors de la suppression du résumé:', erreur);
			});
	};
</script>

{#if data.props.temporariesPrediction.length > 0}
	<div class="temporary-summaries">
		<h2 class="text-3xl mb-3">Temporary summaries</h2>
		<TemporarySummaries temporariesPrediction={data.props.temporariesPrediction} />
	</div>
{:else if data.props.summaries.length > 0}
	<h2 class="text-3xl mb-3">Summaries</h2>
	<Summaries
		summaries={data.props.summaries}
		on:action-remove-summary={(summaryId) => triggerRemoveSummaryAction(summaryId)}
	/>
{:else}
	<div class="grid place-items-center h-screen">
		<p class="text-center">
			Install the chrome extention to extract content on linkedin or articles <br />
			<a
				href="#"
				class="font-medium text-blue-600 dark:text-blue-500 hover:underline inline-flex items-center"
				>Go <ArrowRightOutline /></a
			>
		</p>
	</div>
{/if}

<hr class="my-12 h-0.5 border-t-0 bg-neutral-200" />
