<script lang="ts">
	import { stateValue } from '$internal';
	import { createRootContext } from './main.svelte.js';
	import type { PopoverProps } from './types.js';

	let { children, visible = $bindable(false) }: PopoverProps = $props();

	const ctx = createRootContext({
		visible: stateValue(
			() => visible,
			(v) => (visible = v)
		)
	});
</script>

{@render children?.(ctx.state)}
