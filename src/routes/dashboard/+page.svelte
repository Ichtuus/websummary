<script>
	import Dashboard from '../../views/dashboard/dashboard.svelte';
	export let data;
</script>

<div class="p-4 h-48 rounded bg-gray-50">
	<Dashboard {data} />
</div>
