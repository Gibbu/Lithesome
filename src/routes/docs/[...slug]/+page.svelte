<script lang="ts">
	import { Meta } from '$site/index.js';
	import type { SvelteComponent } from 'svelte';

	let { data } = $props();

	type ComponentType = $$Generic<typeof SvelteComponent<any, any, any>>;
	const Component = $derived(data.component) as unknown as ComponentType;
</script>

<Meta />

<header class="mb-12">
	<h1 class="text-3xl font-bold text-neutral-800 dark:text-white md:text-5xl">{data.meta.title}</h1>
	<p class="mt-4 text-sm font-medium text-neutral-400 dark:text-neutral-500 md:text-lg">{data.meta.description}</p>
</header>

<div class="docprose">
	<Component />
</div>
