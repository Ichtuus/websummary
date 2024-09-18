<script lang="ts">
	import { apiClient } from '$lib/api/client';
	import { ENDPOINTS } from '$lib/api/client/endpoints';
	import { InfoCircleOutline } from 'flowbite-svelte-icons';
	import { useMutation } from '@sveltestack/svelte-query';
	import SummaryActions from '@/views/dashboard/components/summaryActions.svelte';
	import { ESummaryActions, type TemporaryPrediction } from '../types';
	import { invalidate } from '$app/navigation';
	import { actions } from '../constant';

	export let temporariesPrediction: TemporaryPrediction[];

	const triggerActionForTemporarySummaryAction = (
		{ detail }: CustomEvent,
		prediction: TemporaryPrediction
	) => {
		switch (detail) {
			case ESummaryActions.add:
				console.log('action add temporarySummary');
				add(prediction);
				break;
			case ESummaryActions.remove:
				console.log('action remove temporarySummary');
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
		return await apiClient.delete(`${ENDPOINTS.summaries}/${predictionId}`);
	});

	const addmutation = useMutation(async (prediction: TemporaryPrediction) => {
		return await apiClient.post(`${ENDPOINTS.summaries}`, { prediction });
	});
</script>

{#if temporariesPrediction.length > 0}
	<p class="text-teal-600 text-xs inline-flex items-center">
		<InfoCircleOutline class="mr-1" />All summaries display here has not save in your dashboard, if
		you want to save click on <strong class="ml-1 mr-1"> add </strong> button
	</p>
{/if}

{#each temporariesPrediction as temporaryPrediction}
	<div class="p-4 mb-6 rounded bg-gray-50">
		<div class="mb-3 resume-actions">
			<SummaryActions
				{actions}
				isLoading={$removemutation.isLoading}
				on:action-selected={(emitedEvent) =>
					triggerActionForTemporarySummaryAction(emitedEvent, temporaryPrediction)}
			/>
		</div>

		<div class="temporary-summary">
			<h2 class="text-2xl font-extrabold mb-3">{temporaryPrediction.title}</h2>
			<p class="mb-3">{temporaryPrediction.prediction}</p>
			<a
				target="_blank"
				class="font-medium text-blue-600 dark:text-blue-500 hover:underline inline-flex items-center"
				href={temporaryPrediction.url}>Read the original article</a
			>
		</div>
	</div>
{/each}
