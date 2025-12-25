<script lang="ts">
	import { cn } from '../utils.js';

	import type { Props } from '../types.js';

	interface ComponentProps extends Props<HTMLButtonElement | HTMLAnchorElement> {
		variant: 'primary' | 'secondary' | 'text' | 'danger';
		href?: string;
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		class?: string;
		external?: boolean;
		ref?: HTMLButtonElement | HTMLAnchorElement;
	}

	let {
		variant,
		children,
		disabled,
		href,
		ref = $bindable(),
		size = 'md',
		external,
		class: klass,
		...props
	}: ComponentProps = $props();
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	href={href || undefined}
	bind:this={ref}
	disabled={disabled || undefined}
	class={cn(
		'group focusOutline relative inline-flex cursor-pointer items-center justify-center border font-medium',
		{
			primary: [
				'bg-teal-600/15 text-teal-600 hover:bg-teal-500 hover:text-zinc-800',
				'dark:border-teal-500/25 dark:bg-teal-500/10 dark:text-teal-300 dark:hover:bg-teal-500/20 dark:hover:text-teal-50'
			],
			danger: [
				'bg-rose-600/15 text-rose-600 hover:bg-rose-500 hover:text-zinc-800',
				'dark:border-rose-500/25 dark:bg-rose-500/10 dark:text-rose-300 dark:hover:bg-rose-500/20 dark:hover:text-rose-50'
			],
			secondary: [
				'border-zinc-800 bg-black/5 hover:bg-black/10 hover:text-black',
				'dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white'
			],
			text: 'border-transparent hover:bg-black/5 hover:text-black dark:hover:bg-white/5 dark:hover:text-white'
		}[variant],
		{
			sm: 'gap-1 px-3 py-2 text-xs',
			md: 'gap-1.5 px-4 py-3 text-sm',
			lg: 'gap-2.5 px-8 py-4 text-lg'
		}[size],
		disabled && 'pointer-events-none opacity-50',
		klass
	)}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener noreferrer' : undefined}
	{...props}
>
	{#if variant !== 'text'}
		<div
			class={[
				'pointer-events-none absolute left-0 h-full border border-r-0 transition-all group-hover:w-1/2',
				{
					primary: 'border-teal-500',
					danger: 'border-rose-500',
					secondary: 'border-zinc-500',
					text: 'border-transparent'
				}[variant],
				{ sm: 'w-2', md: 'w-3', lg: 'w-5' }[size]
			]}
		></div>
		<div
			class={[
				'pointer-events-none absolute right-0 h-full border border-l-0 transition-all group-hover:w-1/2',
				{
					primary: 'border-teal-500',
					danger: 'border-rose-500',
					secondary: 'border-zinc-500',
					text: 'border-transparent'
				}[variant],
				{ sm: 'w-2', md: 'w-3', lg: 'w-5' }[size]
			]}
		></div>
	{/if}
	{@render children?.()}
</svelte:element>
