<script lang="ts">
	import { stateValue, Element } from '$internal';
	import { createCollapsibleRootContext } from './main.svelte.js';
	import type { CollapsibleProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		visible = $bindable(false),
		self = $bindable(),
		disabled = $bindable(false),
		as = 'div',
		onChange,
		...props
	}: CollapsibleProps = $props();

	const ctx = createCollapsibleRootContext({
		visible: stateValue(
			() => visible,
			(v) => {
				visible = v;
				onChange?.(v);
			}
		),
		disabled: stateValue(() => disabled)
	});
</script>

<Element {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
