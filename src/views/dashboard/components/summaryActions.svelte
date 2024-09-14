<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { EmitedEventName } from '../constant';

	export let actions, isLoading;

	const dispatch = createEventDispatcher();
</script>

{#each actions as action}
	<button
		disabled={isLoading}
		class:pointer-events-none={isLoading}
		class:disabled:opacity-75={isLoading}
		on:click={() => dispatch(EmitedEventName.SELECTED_ACTIONS_TO_TEMPORARY_SUMMARY, action.type)}
		type="button"
		class={action.class}
	>
		{action.label}
	</button>
{/each}
