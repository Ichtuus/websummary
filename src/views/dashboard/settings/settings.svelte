<script>
	import Form from '../../../components/form.base.svelte';
	import Input from '../../../components/input.base.svelte';
</script>

<h2 class="text-3xl mb-3">Settings</h2>

<Form>
	<svelte:fragment slot="body">
		<Input label="Update your password" id="password" type="password" />
	</svelte:fragment>

	<svelte:fragment slot="footer">
		<button class="bg-red-500 text-white py-2 px-4 rounded mt-4"> Save </button>
	</svelte:fragment>
</Form>
