<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { createHovercardRootContext } from './state.svelte.js';

	import type { HovercardProps } from '$lib/types/index.js';

	let {
		children,
		visible = $bindable(false),
		delay = 700,
		disabled = $bindable(false),
		portalTarget = 'body',
		floatingConfig = {}
	}: HovercardProps<typeof ctx.state> = $props();

	let ctx = createHovercardRootContext({
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
