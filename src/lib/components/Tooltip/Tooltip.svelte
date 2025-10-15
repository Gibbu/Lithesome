<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { parseId } from '$lib/internals/utils.svelte.js';
	import { createTooltipRootContext } from './state.svelte.js';

	import type { TooltipProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		children,
		id = parseId(uid),
		visible = $bindable(false),
		delay = 0,
		disabled = $bindable(false),
		portalTarget = 'body',
		floatingConfig = {}
	}: TooltipProps<typeof ctx.state> = $props();

	let ctx = createTooltipRootContext({
		id,
		visible: stateValue(
			() => visible,
			(v) => {
				visible = v;
			}
		),
		disabled: stateValue(
			() => disabled,
			(v) => (disabled = v)
		),
		delay: stateValue(() => delay),
		portalTarget: stateValue(() => portalTarget),
		floatingConfig: stateValue(() => floatingConfig)
	});
</script>

{@render children?.(ctx.state)}
