<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Summary } from '../types';
	import { createEventDispatcher } from 'svelte';
	import { EmitedEventName } from '../constant';

	export let summaries: Summary[] = [];

	const dispatch = createEventDispatcher();
</script>

<div class="summaries-container">
	<ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each summaries as summary (summary.id)}
			<li transition:fade class="bg-white shadow-md rounded-lg p-4">
				<h3 class="text-xl font-semibold mb-2">{summary.predictionTitle}</h3>
				<p class="text-gray-600 mb-4">{summary.predictionText}</p>

				<div class="actions-container mt-4 mb-2 flex justify-between items-center">
					<a
						href={summary.predictionUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="text-blue-500 hover:underline"
					>
						Read the original article
					</a>
					<button
						class="text-red-500 hover:text-red-700 font-medium"
						on:click={() => dispatch(EmitedEventName.REMOVE_ACTIONSSUMMARY, summary.id)}
					>
						Remove
					</button>
				</div>
			</li>
		{/each}
	</ul>
</div>
