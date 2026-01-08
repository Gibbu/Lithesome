<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { parseId } from '$lib/internals/utils.svelte.js';
	import { createSelectRootContext } from './state.svelte.js';

	import type { SelectProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		visible = $bindable(true),
		disabled = $bindable(false),
		portalTarget = 'body',
		floatingConfig = {},
		value = $bindable(),
		multiple = false,
		onValueChanged
	}: SelectProps = $props();

	let ctx = createSelectRootContext({
		id: stateValue(() => id),
		value: stateValue(
			() => value,
			(v) => {
				value = v;
				onValueChanged?.(v);
			}
		),
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
		floatingConfig: stateValue(() => floatingConfig),
		multiple: stateValue(() => multiple)
	});
</script>

{@render children?.(ctx.state)}
