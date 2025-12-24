<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { parseId } from '$lib/internals/utils.svelte.js';
	import { createMenuRootContext } from './state.svelte.js';

	import type { MenuProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		visible = $bindable(false),
		disabled = $bindable(false),
		portalTarget = 'body',
		floatingConfig = {}
	}: MenuProps<typeof ctx.state> = $props();

	let ctx = createMenuRootContext({
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
		portalTarget: stateValue(() => portalTarget),
		floatingConfig: stateValue(() => floatingConfig)
	});
</script>

{@render children?.(ctx.state)}
