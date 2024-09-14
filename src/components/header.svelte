<script lang="ts">
	import SignUpModal from '../views/home/signup/signUpModal.svelte';

	let isOpen = false;
</script>

<header class="absolute inset-x-0 top-0 z-50">
	<nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
		<div class="flex lg:flex-1">
			<a href="#" class="-m-1.5 p-1.5">
				<span>WS</span>
			</a>
		</div>

		<!-- <div class="lg:flex lg:gap-x-12">
			<a href="#" class="text-sm font-semibold leading-6 text-gray-900">Product</a>
			<a href="#" class="text-sm font-semibold leading-6 text-gray-900">Features</a>
			<a href="#" class="text-sm font-semibold leading-6 text-gray-900">Marketplace</a>
			<a href="#" class="text-sm font-semibold leading-6 text-gray-900">Company</a>
		</div> -->
		<div class="lg:flex lg:flex-1 lg:justify-end">
			<button
				data-test="btn-login"
				on:click={() => (isOpen = !isOpen)}
				class="text-sm font-semibold leading-6 text-gray-900"
				>Log in
			</button>
		</div>
	</nav>

	<SignUpModal
		title="Login"
		open={isOpen}
		on:close={() => (isOpen = !isOpen)}
		data-testid="modal-signup"
	>
		<svelte:fragment slot="body">Access to your space and read you're resume 👋</svelte:fragment>
	</SignUpModal>
</header>
