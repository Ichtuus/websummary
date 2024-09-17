<script lang="ts">
	export let label = '';
	export let id = '';
	export let type = 'text';
	export let fullWidth = false;
	export let width = 'sm:col-span-3 md:col-span-2 lg:col-span-1 xl:col-span-1';
</script>

<div class={`${fullWidth ? 'sm:col-span-6' : width}`}>
	<label for={id} class="block text-sm font-medium leading-6 text-gray-900">{label}</label>
	<div class="mt-2">
		<input
			{type}
			{id}
			name="first-name"
			class="w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
		/>
	</div>
</div>
