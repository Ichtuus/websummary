<script>
	export let data;
	console.log('data', data);
</script>

<p class="mb-6">Here is my resume and here is the data</p>

{#each data.props.prediction as prediction}
	{prediction.prediction}
{/each}
