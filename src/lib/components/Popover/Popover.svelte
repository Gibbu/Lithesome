<script lang="ts" context="module">
	import { setupContext } from '$internal';
	import { PopoverContext } from './context.svelte.js';

	export const { context, contextName } = setupContext<PopoverContext>();
</script>

<script lang="ts">
	import { useActions, KEYS, classProp } from '$internal';
	import { setContext } from 'svelte';
	import type { PopoverProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		visible = $bindable(false),
		...props
	}: PopoverProps = $props();

	const ctx = new PopoverContext(
		{ visible },
		{
			onChange(val) {
				visible = val;
			}
		}
	);
	setContext(contextName, ctx);

	const handleKeys = (e: KeyboardEvent) => {
		const { key } = e;
		if (key === KEYS.escape) visible = false;
	};

	$effect(() => {
		ctx.visible = visible;
		if (visible) {
			window.addEventListener('keydown', handleKeys);
		} else {
			window.removeEventListener('keydown', handleKeys);
		}
	});
</script>

<div
	bind:this={self}
	use:useActions={use}
	id={ctx.uid()}
	class={classProp(klass, { visible: ctx.visible })}
	data-popover=""
	data-state={ctx.visible ? 'opened' : 'closed'}
	{...props}
>
	{@render children({ visible: ctx.visible })}
</div>
