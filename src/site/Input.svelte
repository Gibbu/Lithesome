<script lang="ts">
	import { useActions, type BaseProps } from '$lib/internal/index.js';
	import { cn } from './utils.js';

	interface Props extends Omit<BaseProps<HTMLInputElement>, 'children'> {
		value?: string;
		type?: 'text' | 'password';
	}

	let { use = [], class: klass, self, type = 'text', value, ...props }: Props = $props();

	const classProp = $derived(typeof klass === 'function' ? klass({}) : klass);
</script>

<input
	use:useActions={use}
	bind:value
	class={cn(
		'rounded-md border px-2.5 py-2 text-sm font-semibold',
		'border-neutral-300 bg-black/5 dark:border-white/10 dark:bg-white/5',
		'hover:border-neutral-400 dark:hover:border-white/20',
		'focusOutline',
		classProp
	)}
	{type}
	{...props}
/>
