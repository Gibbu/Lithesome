<script lang="ts">
	import type { ClassValue } from 'clsx';
	import type { Snippet } from 'svelte';

	let { children, class: klass }: { children: Snippet; class?: ClassValue } = $props();
</script>

<div
	data-frame-codeblock
	class={['relative border border-zinc-400 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-930', klass]}
>
	<div class="plus absolute -top-2 -left-2 flex size-4 items-center justify-center text-teal-500"></div>
	<div class="plus absolute -top-2 -right-2 flex size-4 items-center justify-center text-teal-500"></div>
	<div class="plus absolute -bottom-2 -left-2 flex size-4 items-center justify-center text-teal-500"></div>
	<div class="plus absolute -right-2 -bottom-2 flex size-4 items-center justify-center text-teal-500"></div>
	{@render children()}
</div>

<style>
	.plus {
		z-index: 1;
		&::before,
		&::after {
			content: '';
			position: absolute;
			width: 1px;
			height: 100%;
			background: currentColor;
		}
		&::before {
			rotate: 90deg;
		}
	}
</style>
