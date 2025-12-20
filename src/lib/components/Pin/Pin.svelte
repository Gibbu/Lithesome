<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId } from '$lib/internals/index.js';
	import { createPinRootContext } from './state.svelte.js';

	import type { PinProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		value = $bindable([]),
		disabled = $bindable(false),
		placeholder = '○',
		type = $bindable('text'),
		onChanged,
		onFilled,
		ref = $bindable(),
		...props
	}: PinProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = createPinRootContext({
		id,
		ref: stateValue(() => ref!),
		value: stateValue(
			() => value,
			(v) => {
				value = v;
				onChanged?.(v);
			}
		),
		disabled: stateValue(() => disabled),
		placeholder: stateValue(() => placeholder),
		type: stateValue(() => type)
	});

	$effect(() => {
		if (ctx.Filled) onFilled?.($state.snapshot(ctx.$value.val));
	});
</script>

<Element bind:ref {children} {custom} {ctx} {...props} />
