<script lang="ts" generics="T extends FloatingContext">
	import { onMount } from 'svelte';
	import { Element, log, type PropsNoChildren } from '$internal';
	import type { FloatingContext } from './types.js';

	interface ComponentProps extends PropsNoChildren<HTMLDivElement> {
		component: string;
		ctx: T;
	}

	let {
		class: klass,
		use = [],
		self = $bindable(),
		ctx,
		as = 'div',
		transition,
		component,
		...props
	}: ComponentProps = $props();

	const attrs = $derived.by(() => ({
		id: ctx._root.uid('arrow'),
		[`data-${component.toLowerCase()}arrow`]: ''
	}));

	onMount(() => {
		if (!ctx) throw log.error(`<${component}Arrow /> must be a child of <${component}Content />`);
		if (!self) throw log.error(`Cannot initialize arrow node of <${component}Arrow />.`);
		ctx._root.arrow = self;
	});
</script>

<Element {transition} {as} {klass} bind:self {use} state={ctx.state} {...attrs} {...props} />
