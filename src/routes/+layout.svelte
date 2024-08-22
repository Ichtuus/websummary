<script lang="ts">
	import { browser } from '$app/environment';

	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import '../app.css';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
</script>

<!-- <div class="flex bg-gray-100"> -->
<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
<!-- </div> -->
