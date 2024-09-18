<script lang="ts">
	import { CloseOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';

	interface ISidebarListItem {
		label: string;
		link: string;
		icon: string;
	}

	export let sidebarListItem: ISidebarListItem[];
	export let isOpen = false;
	let classSidebar: string;
	const dispatch = createEventDispatcher();

	const logout = async () => {
		await fetch('/api/oauth/logout');
		location.href = '/';
	};

	const closeSidebar = () => {
		isOpen = false;
		dispatch('close:sidebar', isOpen);
	};

	$: {
		isOpen;
		classSidebar = isOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0';
	}
</script>

<aside
	id="default-sidebar"
	class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform {classSidebar}"
	aria-label="Sidebar"
>
	<div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
		<div class="flex justify-end sm:hidden">
			<button on:click={closeSidebar}>
				<CloseOutline size="lg" color="white" />
			</button>
		</div>

		<ul class="space-y-2 font-medium">
			{#each sidebarListItem as sidebarItem}
				<li>
					<a
						href={sidebarItem.link}
						class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
					>
						<svelte:component this={sidebarItem.icon} />
						<span class="ms-3">{sidebarItem.label}</span>
					</a>
				</li>
			{/each}
		</ul>
		<button on:click={logout} class="bg-red-500 text-white py-2 px-4 rounded mt-4">
			Log out
		</button>
	</div>
</aside>
