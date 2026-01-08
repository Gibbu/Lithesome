<script lang="ts">
	import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from '$lib/index.js';

	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		type: 'bindable' | 'required';
	}

	let { children, type }: Props = $props();

	const colours = {
		bindable: 'border-teal-600 text-teal-600 dark:border-teal-500 dark:text-teal-300',
		required: 'border-rose-600 text-rose-600 dark:border-rose-500 dark:text-rose-300'
	}[type];
	const label = {
		bindable: '$bindable',
		required: 'required'
	}[type];
</script>

<Tooltip floatingConfig={{ placement: 'top', offset: 10 }} delay={[250, 0]}>
	<TooltipTrigger class={['rounded-md border bg-transparent px-2 py-1.5 text-xs font-bold', colours]}>
		{label}
	</TooltipTrigger>
	<TooltipContent
		class={[
			'max-w-[320px] rounded-md px-4 py-1.5 text-sm leading-loose shadow-lg',
			'bg-white text-black',
			'dark:bg-zinc-700 dark:text-white'
		]}
	>
		<TooltipArrow class="size-3 rotate-45 bg-white dark:bg-zinc-700" />
		{@render children()}
	</TooltipContent>
</Tooltip>
