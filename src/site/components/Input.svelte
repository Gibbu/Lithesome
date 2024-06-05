<script lang="ts">
	import { useActions, type PropsNoChildren } from '$internal';
	import { cn } from '../utils.js';

	interface Props extends PropsNoChildren<HTMLInputElement> {
		value?: string;
		type?: 'text' | 'password';
		error?: string;
	}

	let {
		use = [],
		class: klass,
		self = $bindable(),
		error = $bindable(),
		type = 'text',
		value = $bindable(),
		...props
	}: Props = $props();

	const classProp = $derived(typeof klass === 'function' ? klass({}) : klass);
</script>

<input
	use:useActions={use}
	bind:value
	class={cn(
		'rounded-md border px-2.5 py-2 text-sm font-semibold',
		' bg-black/5  dark:bg-white/5',
		'hover:border-neutral-400 dark:hover:border-white/20',
		'focusOutline',
		error ? 'border-red-500' : 'border-neutral-300 dark:border-white/10',
		classProp
	)}
	{type}
	{...props}
/>
