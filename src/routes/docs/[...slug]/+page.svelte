<script lang="ts">
	import { cn, Meta } from '$site/index.js';
	import type { SvelteComponent } from 'svelte';

	let { data } = $props();

	type Component = $$Generic<typeof SvelteComponent<any, any, any>>;
	const component = $derived(data.component) as unknown as Component;
</script>

<Meta />

<header class="mb-12">
	<h1 class="text-5xl font-semibold text-white">{data.meta.title}</h1>
	<p class="mt-4 text-lg font-medium text-neutral-400">{data.meta.description}</p>
</header>
<article
	class={cn(
		'prose max-w-full dark:prose-invert',
		'prose-blockquote:border-neutral-600 prose-blockquote:text-neutral-500',
		'prose-headings:tracking-wide prose-h3:text-lg',
		'prose-tr:grid prose-tr:grid-cols-[.4fr,.6fr,1fr] prose-tr:py-3',
		'prose-thead:border-white/15 prose-tr:border-white/10',
		'prose-teal'
	)}
>
	<svelte:component this={component} />
</article>
