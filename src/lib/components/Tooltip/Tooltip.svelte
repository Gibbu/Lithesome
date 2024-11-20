<script lang="ts">
	import { parseDelay, stateValue } from '$internal';
	import { createTooltipRootContext } from './main.svelte.js';

	import type { TooltipProps } from './types.js';

	let { children, visible = $bindable(false), disabled = $bindable(false), delay = 0 }: TooltipProps = $props();

	const ctx = createTooltipRootContext({
		visible: stateValue(
			() => visible,
			(v) => (visible = v)
		),
		disabled: stateValue(() => disabled),
		delay: stateValue(() => parseDelay(delay))
	});
</script>

{@render children?.(ctx.state)}
