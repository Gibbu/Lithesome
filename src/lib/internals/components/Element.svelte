<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassProp, Props, StyleProp } from '../types.js';

	interface ElProps extends Props<HTMLElement, any, any> {
		ctx: Record<string, any>;
		children?: Snippet<[any]>;
		custom?: Snippet<[any]>;
		as?: keyof HTMLElementTagNameMap;
		visible?: boolean;
		class?: ClassProp<any>;
		style?: StyleProp<any>;
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

	const camelToKebab = (property: string) => {
		return property.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
	};

	const selfClosing: (keyof HTMLElementTagNameMap)[] = ['input', 'hr', 'img'];

	const classes = $derived(typeof klass === 'function' ? klass(ctx.state) : klass);
	const styles = $derived.by(() => {
		let styleObject: Record<string, any> = {};
		let styleString: string = '';

		if (typeof style === 'string') styleString += style;
		if (typeof style === 'object') styleObject = { ...styleObject, ...style };
		if (ctx.styles) styleObject = { ...styleObject, ...ctx.styles };
		if (typeof style === 'function') {
			const values = style(ctx.state) as Record<string, any>;
			if (typeof values === 'string') styleString += values;
			else styleObject = { ...styleObject, ...values };
		}
		return (
			Object.entries(styleObject)
				.map(([p, k]) => (k ? `${camelToKebab(p)}: ${k};` : undefined))
				.join('') + styleString
		);
	});

	$inspect(styles);
</script>

{#snippet element()}
	{#if custom}
		{@render custom({ attrs: { ...ctx.attrs, ...ctx.styles }, state: ctx.state })}
	{:else if selfClosing.includes(as)}
		<svelte:element this={as} bind:this={ref} {...ctx.attrs} {...props} class={classes} style={styles} />
	{:else}
		<svelte:element this={as} bind:this={ref} {...ctx.attrs} {...props} class={classes} style={styles}>
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
