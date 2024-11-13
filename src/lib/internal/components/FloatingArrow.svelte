<script lang="ts" generics="T extends FloatingContext">
	import { onMount } from 'svelte';
	import { useActions, classProp, log, type PropsNoChildren } from '$internal';

	import type { FloatingContext } from './types.js';

	interface ComponentProps extends PropsNoChildren<HTMLDivElement> {
		component: string;
		ctx: T;
	}

	let { class: klass, use = [], self = $bindable(), ctx, component, ...props }: ComponentProps = $props();

	const attrs = $derived.by(() => ({
		id: ctx.root.uid('arrow'),
		[`data-${component.toLowerCase()}arrow`]: ''
	}));

	onMount(() => {
		if (!ctx) throw log.error(`<${component}Arrow /> must be a child of <${component}Content />`);
		if (!self) throw log.error(`Cannot initialize arrow node of <${component}Arrow />.`);
		ctx.root.arrow = self;
	});
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...attrs} {...props}></div>
