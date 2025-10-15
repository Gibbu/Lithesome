<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassProp, Props } from '../types.js';

	interface ElProps extends Props<HTMLElement, any, any> {
		ctx: Record<string, any>;
		children?: Snippet<[any]>;
		custom?: Snippet<[any]>;
		as?: keyof HTMLElementTagNameMap;
		visible?: boolean;
		class?: ClassProp<any>;
		style?: ClassProp<any>;
		ref?: HTMLElement;
		[key: string]: any;
	}

	let {
		ctx,
		children,
		custom,
		as = 'div',
		visible = $bindable(),
		ref = $bindable(),
		class: klass,
		style,
		...props
	}: ElProps = $props();

	const classes = $derived(typeof klass === 'function' ? klass(ctx.state) : klass);
</script>

{#snippet element()}
	{#if custom}
		{@render custom({ attrs: ctx.attrs, state: ctx.state })}
	{:else if as === 'input'}
		<svelte:element this={as} bind:this={ref} {...ctx.attrs} {...props} class={classes} />
	{:else}
		<svelte:element this={as} bind:this={ref} {...ctx.attrs} {...props} class={classes}>
			{@render children?.(ctx.state)}
		</svelte:element>
	{/if}
{/snippet}

{#if custom}
	{@render custom({ attrs: ctx.attrs, state: ctx.state })}
{:else if typeof visible === 'boolean'}
	{#if visible}
		{@render element()}
	{/if}
{:else}
	{@render element()}
{/if}
