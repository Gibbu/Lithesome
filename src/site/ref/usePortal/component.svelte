<script lang="ts">
	import { usePortal } from '$lib/index.js';
	import { Button, cn } from '$site/index.js';

	const preview = 'article [id^="tabs-"]';

	let target = $state(preview);
</script>

<Button variant="primary" onclick={() => (target = target === 'main header' ? preview : 'main header')}>
	Portal content
</Button>

<div
	use:usePortal={target}
	class={cn(
		target === 'body' ? 'absolute top-0' : '',
		'rounded-full bg-black px-4 py-1 text-sm text-white dark:bg-white dark:text-black'
	)}
>
	Hi there
</div>
