<script lang="ts">
	import { cn, Meta } from '$site/index.js';
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
<article
	class={cn(
		'prose max-w-full dark:prose-invert',
		'prose-blockquote:text-neutral-500 dark:prose-blockquote:border-neutral-600 dark:prose-blockquote:text-neutral-500',
		'prose-headings:tracking-wide prose-h3:text-lg',
		'prose-tr:grid prose-tr:grid-cols-[.4fr,.6fr,1fr] prose-tr:py-3',
		'dark:prose-thead:border-white/15 dark:prose-tr:border-white/10',
		'prose-teal'
	)}
>
	<Component />
</article>
