<script lang="ts">
	import { ESummaryActions, type Summary } from '../types';
	import { actions } from '../constant';
	import SummaryActions from '@/views/dashboard/components/summaryActions.svelte';
	import { useMutation } from '@sveltestack/svelte-query';
	import { apiClient } from '$lib/api/client';
	import { ENDPOINTS } from '$lib/api/client/endpoints';
	import { invalidate } from '$app/navigation';

	export let summaries: Summary[] = [];

	const triggerActionForSummaryAction = ({ detail }: CustomEvent, prediction: Summary) => {
		switch (detail) {
			case ESummaryActions.add:
				console.log('action add summary');
				add(prediction);
				break;
			case ESummaryActions.remove:
				console.log('action remove summary');
				remove(prediction.id);
				//https://kit.svelte.dev/docs/modules#$app-navigation-invalidate
				invalidate((url) => url.pathname === '/dashboard/summaries');
				break;
			default:
				break;
		}
	};

	const remove = async (predictionId: string) => {
		$removemutation.mutate(predictionId);
	};

	const add = async (summary: any) => {
		$addmutation.mutate(summary);
	};

	const removemutation = useMutation(async (predictionId: string) => {
		return await apiClient.delete(`${ENDPOINTS.summaries}/${predictionId}?mode=summary`);
	});

	const addmutation = useMutation(async (prediction: Summary) => {
		return await apiClient.post(`${ENDPOINTS.summaries}`, { prediction });
	});
</script>

<div class="summaries-container">
	{#each summaries as summary (summary.id)}
		<div class="p-4 mb-6 rounded bg-gray-50">
			<div class="mb-3 resume-actions">
				<SummaryActions
					{actions}
					isLoading={$removemutation.isLoading}
					on:action-selected={(emitedEvent) => triggerActionForSummaryAction(emitedEvent, summary)}
				/>
			</div>
			<div class="summary">
				<h2 class="text-2xl font-extrabold mb-3">{summary.predictionTitle}</h2>
				<p class="mb-3">{summary.predictionText}</p>
				<a
					target="_blank"
					class="font-medium text-blue-600 dark:text-blue-500 hover:underline inline-flex items-center"
					href={summary.predictionUrl}>Read the original article</a
				>
			</div>
		</div>
	{/each}
</div>
