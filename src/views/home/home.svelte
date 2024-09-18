<script lang="ts">
	import Header from '@/components/header.svelte';
	import Footer from '@/components/footer.svelte';
	import BgColorTop from '@/components/bgColorTop.svelte';
	import BgColorBottom from '@/components/bgColorBottom.svelte';

	import GetStarted from './getStarted.svelte';
	import Presentation from './presentation.svelte';

	import { onMount } from 'svelte';

	let isRedirectedFromExtension = false;

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const redirectFrom = urlParams.get('redirectFrom');

		if (redirectFrom === 'extension') {
			isRedirectedFromExtension = true;
		}
	});
</script>

<div class="bg-white">
	<Header {isRedirectedFromExtension} />

	<div class="relative isolate px-6 pt-14 lg:px-8">
		<BgColorTop />

		<div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
			<GetStarted />
		</div>

		<BgColorBottom />

		<Presentation />
	</div>
</div>

<Footer />
