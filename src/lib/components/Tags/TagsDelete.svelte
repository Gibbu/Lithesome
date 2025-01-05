<script lang="ts">
	import { Element, stateValue } from '$internal';
	import { useTagsDelete } from './main.svelte.js';
	import type { TagsDeleteProps } from './types.js';

	let {
		children,
		use = [],
		self = $bindable(),
		class: klass,
		value,
		onClick,
		as = 'button',
		transition,
		...props
	}: TagsDeleteProps = $props();

	const ctx = useTagsDelete(
		{
			value: stateValue(() => value)
		},
		{
			onClick
		}
	);
</script>

<Element {transition} {as} {klass} bind:self {use} {children} {...ctx.attrs} {...props} />
