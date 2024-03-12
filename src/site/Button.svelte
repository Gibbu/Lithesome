<script lang="ts">
	import type { BaseProps } from '$lib/internal/index.js';
	import { cn } from './utils.js';

	interface Props extends BaseProps<HTMLButtonElement | HTMLAnchorElement> {
		variant: 'primary' | 'secondary' | 'text';
		href?: string;
		size?: 'sm' | 'md' | 'lg';
		self?: HTMLElement;
		disabled?: boolean;
	}

	let { children, variant, size = 'md', class: klass, href, self, disabled, ...props } = $props<Props>();
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	type="button"
	href={href || undefined}
	disabled={disabled || undefined}
	class={cn(
		'inline-flex items-center justify-center border text-center font-medium',
		size === 'sm' ? 'text-xs' : '',
		size === 'md' ? 'gap-2 rounded-md px-4 py-2.5 text-sm' : '',
		size === 'lg' ? 'gap-3 rounded-lg px-6 py-3.5' : '',
		variant === 'primary' ? 'bg-white text-black hover:bg-neutral-300' : '',
		variant === 'secondary' ? 'border-white/20 bg-black/15 text-white hover:bg-white hover:text-black' : '',
		variant === 'text' ? 'border-transparent text-white hover:bg-white/5' : '',
		klass
	)}
	{...props}
>
	{@render children({})}
</svelte:element>
