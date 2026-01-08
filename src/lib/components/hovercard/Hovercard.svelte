<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { parseId } from '$lib/internals/utils.svelte.js';
	import { createHovercardRootContext } from './state.svelte.js';

	import type { HovercardProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		visible = $bindable(false),
		delay = 700,
		disabled = $bindable(false),
		portalTarget = 'body',
		floatingConfig = {}
	}: HovercardProps = $props();

	let ctx = createHovercardRootContext({
		id: stateValue(() => id),
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
