<script>
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import Meta from '$site/Meta.svelte';
	import NProgress from 'nprogress';
	import '../app.pcss';

	beforeNavigate(() => {
		NProgress.start();
	});
	afterNavigate(() => {
		NProgress.done();
	});
</script>

<Meta />

<div class="relative flex min-h-screen flex-col">
	<div
		style="background-image: url('/background.png'); mask: radial-gradient(circle at top, black, transparent);"
		class="pointer-events-none absolute inset-0 top-0 -z-10 max-h-[1000px] select-none invert dark:invert-0"
	/>
	<div class="flex flex-1 flex-col">
		<slot />
	</div>
</div>
