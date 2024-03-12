<script lang="ts">
	import { cn } from '$site/index.js';
	import type { SvelteComponent } from 'svelte';

	let { data } = $props();

	type Component = $$Generic<typeof SvelteComponent<any, any, any>>;
	const component = $derived(data.component) as unknown as Component;
</script>

<header class="mb-12">
	<h1 class="text-5xl font-semibold text-white">{data.meta.title}</h1>
	<p class="mt-4 text-lg font-medium text-neutral-400">{data.meta.description}</p>
</header>
<div class={cn('prose max-w-full dark:prose-invert')}>
	<svelte:component this={component} />
</div>
