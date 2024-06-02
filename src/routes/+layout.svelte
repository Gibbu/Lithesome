<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { Meta } from '$site/index.js';
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
	<div class="flex flex-1 flex-col">
		<slot />
	</div>
</div>
