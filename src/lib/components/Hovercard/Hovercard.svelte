<script lang="ts">
	import { parseDelay, stateValue } from '$internal';
	import { createRootContext } from './main.svelte.js';

	import type { HovercardProps } from './types.js';

	let { children, visible = $bindable(false), delay = 700 }: HovercardProps = $props();

	const ctx = createRootContext({
		delays: stateValue(() => parseDelay(delay)),
		visible: stateValue(
			() => visible,
			(v) => (visible = v)
		)
	});
</script>

{@render children?.(ctx.state)}
