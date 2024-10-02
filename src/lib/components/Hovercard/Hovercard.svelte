<script lang="ts">
	import { useActions, classProp, parseDelay, stateValue } from '$internal';
	import { createRootContext } from './main.svelte.js';
	import type { HovercardProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		visible = $bindable(false),
		self = $bindable(),
		delay = 700,
		...props
	}: HovercardProps = $props();

	const delays = parseDelay(delay);

	const ctx = createRootContext({
		delays: stateValue(() => delays),
		visible: stateValue(
			() => visible,
			(v) => (visible = v)
		)
	});
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
	{@render children?.(ctx.state)}
</div>
