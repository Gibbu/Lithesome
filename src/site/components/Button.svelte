<script lang="ts">
	import { type Props, useActions } from '$internal';
	import { cn } from '../utils.js';

	interface ComponentProps extends Props<HTMLButtonElement | HTMLAnchorElement> {
		variant: 'primary' | 'secondary' | 'text' | 'ghost';
		href?: string;
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		type?: 'button' | 'submit';
	}

	let {
		children,
		variant,
		size = 'md',
		class: klass,
		use = [],
		href,
		self,
		type = 'button',
		disabled,
		...props
	}: ComponentProps = $props();
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	bind:this={self}
	type={!href ? type : undefined}
	href={href || undefined}
	disabled={disabled || undefined}
	use:useActions={use}
	class={cn(
		'inline-flex items-center justify-center border text-center font-medium',
		'focusOutline',
		size === 'sm' ? 'gap-2 rounded-md px-3 py-2 text-xs' : '',
		size === 'md' ? 'gap-2 rounded-md px-4 py-2.5 text-sm' : '',
		size === 'lg' ? 'gap-3 rounded-lg px-6 py-3.5' : '',
		variant === 'primary'
			? 'bg-black text-white hover:bg-neutral-700 dark:bg-white dark:text-black dark:hover:bg-neutral-300'
			: '',
		variant === 'secondary'
			? 'border-black/20 bg-white/15 text-black hover:bg-black hover:text-white dark:border-white/20 dark:bg-black/15 dark:text-white dark:hover:bg-white dark:hover:text-black'
			: '',
		variant === 'text' ? 'border-transparent text-white hover:bg-white/5' : '',
		variant === 'ghost'
			? 'border-transparent bg-neutral-100 text-black hover:bg-neutral-200 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800'
			: '',
		klass
	)}
	{...props}
>
	{@render children?.({})}
</svelte:element>
