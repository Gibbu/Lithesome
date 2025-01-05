<script lang="ts">
	import { Element, stateValue } from '$internal';
	import { createTagsRootContext } from './main.svelte.js';

	import type { TagsProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		value = $bindable([]),
		max = 0,
		disabled = $bindable(false),
		blacklist = [],
		whitelist = [],
		transition,
		as = 'div',
		onClick,
		...props
	}: TagsProps = $props();

	const ctx = createTagsRootContext(
		{
			value: stateValue(
				() => value,
				(v) => {
					value = v;
				}
			),
			max: stateValue(() => max),
			disabled: stateValue(() => disabled),
			blacklist: stateValue(() => blacklist),
			whitelist: stateValue(() => whitelist)
		},
		{
			onClick
		}
	);
</script>

<Element {transition} {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
