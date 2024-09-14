<script lang="ts">
	import { apiClient } from '$lib/api/client';
	import { ENDPOINTS } from '$lib/api/client/endpoints';
	import { InfoCircleOutline } from 'flowbite-svelte-icons';
	import { useMutation } from '@sveltestack/svelte-query';
	import SummaryActions from '../components/summaryActions.svelte';
	import { ESummaryActions } from '../types';
	import { invalidate } from '$app/navigation';

	export let data;

	const actions = [
		{
			label: 'Add',
			type: ESummaryActions.add,
			class:
				'px-3 py-2 text-green-700 font-medium text-xs hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800'
		},
		{
			label: 'Remove',
			type: ESummaryActions.remove,
			class:
				'px-3 py-2 text-xs font-medium text-center text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 rounded-lg'
		}
	];

	const triggerActionForSummary = ({ detail }: CustomEvent, prediction: any) => {
		switch (detail) {
			case ESummaryActions.add:
				console.log('action add');
				add(prediction);
				break;
			case ESummaryActions.remove:
				console.log('action remove');
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

	const addmutation = useMutation(async (prediction: any) => {
		return await apiClient.post(`${ENDPOINTS.summaries}`, { prediction });
	});
</script>

{#if data.props.prediction.length > 0}
	<p class="text-teal-600 text-xs inline-flex items-center">
		<InfoCircleOutline class="mr-1" />All summaries display here has not save in your dashboard, if
		you want to save click on <strong class="ml-1 mr-1"> add </strong> button
	</p>
{/if}

{#each data.props.temporariesPrediction as temporaryPrediction}
	<div class="p-4 mb-6 rounded bg-gray-50">
		<div class="mb-3 resume-actions">
			<SummaryActions
				{actions}
				isLoading={$removemutation.isLoading}
				on:action-selected={(emitedEvent) =>
					triggerActionForSummary(emitedEvent, temporaryPrediction)}
			/>
		</div>

		<div class="temporary-summary">
			<h2 class="text-2xl font-extrabold mb-3">{temporaryPrediction.title}</h2>
			<p class="mb-3">{temporaryPrediction.prediction}</p>
			<a
				target="_blank"
				class="font-medium text-blue-600 dark:text-blue-500 hover:underline inline-flex items-center"
				href={temporaryPrediction.url}>Source</a
			>
		</div>
	</div>
{/each}
