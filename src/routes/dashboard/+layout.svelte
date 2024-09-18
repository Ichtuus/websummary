<script>
	import Sidebar from '@/views/dashboard/components/sidebar.svelte';
	import { HomeSolid, InboxSolid, CogSolid, BarsFromLeftOutline } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';

	const sidebarListItem = [
		{ label: 'Dashboard', link: '/dashboard', icon: HomeSolid },
		{ label: 'My summaries', link: '/dashboard/summaries', icon: InboxSolid },
		{ label: 'Settings', link: '/dashboard/settings', icon: CogSolid }
	];

	let isOpen = false;

	$: {
		if ($page.url.pathname) {
			isOpen = false;
		}
	}
</script>

<button
	on:click={() => (isOpen = !isOpen)}
	data-drawer-target="default-sidebar"
	data-drawer-toggle="default-sidebar"
	aria-controls="default-sidebar"
	type="button"
	class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
>
	<BarsFromLeftOutline size="lg" />
</button>

<Sidebar
	{sidebarListItem}
	{isOpen}
	on:close:sidebar={(emitedValue) => (isOpen = emitedValue.detail)}
/>

<div class="p-4 sm:ml-64">
	<div class="p-4 rounded-lg">
		<div class="items-center justify-center">
			<slot />
		</div>
	</div>
</div>
