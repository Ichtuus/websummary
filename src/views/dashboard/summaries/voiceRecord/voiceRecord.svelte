<script lang="ts">
	import { onDestroy } from 'svelte';
	import { PlaySolid, StopSolid } from 'flowbite-svelte-icons';
	import { MediaRecorderService } from './services/mediaRecorder';
	import VoiceRecordLoader from './components/voiceRecordLoader.svelte';

	const recorder = new MediaRecorderService();
	const recorderStore = recorder.recorderStore;

	const startRecord = () => {
		recorder.startRecording();
	};

	const stopRecord = () => {
		recorder.stopRecording();
	};

	onDestroy(() => {
		recorder.clearRecording();
	});
</script>

<div id="recorder"></div>

<div class="voiceRecord-player mt-4 flex justify-center gap-3">
	{#if $recorderStore.isRecording}
		<VoiceRecordLoader />

		<button
			class="w-8 h-8 dark:bg-gray-800 rounded-full justify-items-center text-white"
			on:click={stopRecord}
			id="stop"><svelte:component this={StopSolid} /></button
		>
	{:else if !$recorderStore.audioURL}
		<button
			on:click={startRecord}
			id="play"
			class="w-8 h-8 dark:bg-gray-800 rounded-full justify-items-center text-white"
			><svelte:component this={PlaySolid} /></button
		>
	{/if}
</div>

<div class="voiceRecord-actions">
	{#if $recorderStore.audioURL}
		<p>Summarize you're audio ?</p>

		<audio controls>
			<source src={$recorderStore.audioURL} type="audio/webm" />
			Your browser does not support the audio element.
		</audio>
	{/if}
</div>
