<script lang="ts" generics="T extends HTMLElement, S extends Record<string, any>">
	import {
		useActions,
		getTransition,
		classProp,
		type HTMLActionArray,
		type Transition,
		type ClassProp
	} from '$internal';

	import type { Snippet } from 'svelte';

	interface Props {
		as: string;
		children?: Snippet<[S]>;
		use: HTMLActionArray;
		klass: ClassProp<S>;
		state?: S;
		self?: T;
		visible?: boolean;
		transition?: Transition;
		[k: string]: any;
	}

	let {
		as,
		klass,
		use = [],
		self = $bindable(),
		children,
		state,
		visible = $bindable(),
		transition,
		...props
	}: Props = $props();
</script>

{#if transition}
	{@const { inTransition, outTransition } = getTransition(transition)}
	{#if visible && inTransition && outTransition}
		{@const { config: inConf, transition: inFn } = inTransition}
		{@const { config: outConf, transition: outFn } = outTransition}
		<svelte:element
			this={as}
			class={classProp(klass, state)}
			use:useActions={use}
			bind:this={self}
			in:inFn={inConf}
			out:outFn={outConf}
			{...props}
		>
			{@render children?.(state as S)}
		</svelte:element>
	{:else if visible && inTransition && !outTransition}
		{@const { config: inConf, transition: inFn } = inTransition}
		<svelte:element
			this={as}
			class={classProp(klass, state)}
			use:useActions={use}
			bind:this={self}
			in:inFn={inConf}
			{...props}
		>
			{@render children?.(state as S)}
		</svelte:element>
	{:else if visible && !inTransition && outTransition}
		{@const { config: outConf, transition: outFn } = outTransition}
		<svelte:element
			this={as}
			class={classProp(klass, state)}
			use:useActions={use}
			bind:this={self}
			out:outFn={outConf}
			{...props}
		>
			{@render children?.(state as S)}
		</svelte:element>
	{/if}
{:else if typeof visible === 'boolean' && visible && !transition}
	<svelte:element this={as} class={classProp(klass, state)} use:useActions={use} bind:this={self} {...props}>
		{@render children?.(state as S)}
	</svelte:element>
{:else if typeof visible === 'undefined'}
	<svelte:element this={as} class={classProp(klass, state)} use:useActions={use} bind:this={self} {...props}>
		{@render children?.(state as S)}
	</svelte:element>
{/if}
