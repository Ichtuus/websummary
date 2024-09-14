<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let summaries = [];

	onMount(() => {
		// Ici, vous pourriez ajouter une logique pour charger les résumés si nécessaire
	});
</script>

<div class="summaries-container">
	<ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each summaries as summary (summary.id)}
			<li transition:fade class="bg-white shadow-md rounded-lg p-4">
				<h3 class="text-xl font-semibold mb-2">{summary.predictionTitle}</h3>
				<p class="text-gray-600 mb-4">{summary.predictionText}</p>
				<a
					href={summary.predictionUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="text-blue-500 hover:underline"
				>
					Lire l'article original
				</a>
			</li>
		{/each}
	</ul>
</div>
