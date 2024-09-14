<script>
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import TemporarySummaries from './temporarySummaries.svelte';
	import Summaries from './summaries.svelte';
	export let data;
</script>

{#if data.props.temporariesPrediction.length > 0}
	<div class="temporary-summaries">
		<h2 class="text-3xl mb-3">Temporary summaries</h2>
		<TemporarySummaries {data} />
	</div>
{:else if data.props.summaries.length > 0}
	<h2 class="text-3xl mb-3">Summaries</h2>
	<Summaries summaries={data.props.summaries} />
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
