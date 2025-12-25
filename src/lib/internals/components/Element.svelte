<script lang="ts">
	import { camelToKebab, styleObjectToString } from '../utils.svelte.js';

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

		return styleObjectToString(styleObject) + styleString || undefined;
	});
	const propsWithState = $derived.by(() => {
		let props = ctx.props;
		for (const key in ctx.state) {
			if (ctx.state[key] != null && ctx.state[key] !== false)
				props = { ...props, [`data-${camelToKebab(key)}`]: ctx.state[key] };
		}
		return props;
	});
</script>

{#snippet element()}
	{#if selfClosing.includes(as)}
		<svelte:element this={as} bind:this={ref} {...propsWithState} {...props} class={classes} style={styles} />
	{:else}
		<svelte:element this={as} bind:this={ref} {...propsWithState} {...props} class={classes} style={styles}>
			{@render children?.(ctx.state)}
		</svelte:element>
	{/if}
{/snippet}

{#if custom}
	{@const props = ctx.styles ? { ...propsWithState, style: styles } : propsWithState}
	{@render custom({ props, state: ctx.state })}
{:else if typeof visible === 'boolean'}
	{#if visible}
		{@render element()}
	{/if}
{:else}
	{@render element()}
{/if}
