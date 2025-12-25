<script lang="ts">
	import { cn } from '$site/index.js';

	import type { ClassValue } from 'clsx';
	import type { Snippet } from 'svelte';

	let {
		children,
		containerClass,
		headerClass,
		bodyClass,
		header,
		footer,
		ref = $bindable(),
		as = 'div',
		absolute = false,
		...props
	}: {
		children: Snippet;
		containerClass?: ClassValue;
		headerClass?: ClassValue;
		bodyClass?: ClassValue;
		header?: Snippet;
		footer?: Snippet;
		ref?: HTMLElement;
		as?: keyof HTMLElementTagNameMap;
		absolute?: boolean;
		[key: string]: any;
	} = $props();
</script>

<svelte:element
	this={as}
	bind:this={ref}
	class={cn(
		'border border-zinc-400 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-940',
		absolute ? 'absolute' : 'relative',
		containerClass
	)}
	{...props}
>
	<div
		class="pointer-events-none absolute -top-[2px] -left-[2px] size-4 border-t-2 border-l-2 border-zinc-950 dark:border-zinc-500"
	></div>
	<div
		class="pointer-events-none absolute -top-[2px] -right-[2px] size-4 border-t-2 border-r-2 border-zinc-950 dark:border-zinc-500"
	></div>
	{#if header}
		<header class={cn('border-b border-zinc-300 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-920', headerClass)}>
			{@render header()}
		</header>
	{/if}
	<div class={cn('p-6', bodyClass)}>
		{@render children()}
	</div>
	{#if footer}
		<footer class="flex justify-end gap-3 border-t border-zinc-400 p-6 dark:border-zinc-800">
			{@render footer()}
		</footer>
	{/if}
	<div
		class="pointer-events-none absolute -bottom-[2px] -left-[2px] size-4 border-b-2 border-l-2 border-zinc-950 dark:border-zinc-500"
	></div>
	<div
		class="pointer-events-none absolute -right-[2px] -bottom-[2px] size-4 border-r-2 border-b-2 border-zinc-950 dark:border-zinc-500"
	></div>
</svelte:element>
