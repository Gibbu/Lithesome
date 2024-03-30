<script lang="ts">
	import { useActions, type BasePropsNoChildren } from '$lib/internal/index.js';
	import { cn } from './utils.js';

	interface Props extends BasePropsNoChildren<HTMLInputElement> {
		value?: string;
		type?: 'text' | 'password';
	}

	let { use = [], class: klass, self = $bindable(), type = 'text', value = $bindable(), ...props }: Props = $props();

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
