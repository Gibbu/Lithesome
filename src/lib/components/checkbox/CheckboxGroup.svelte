<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId } from '$lib/internals/index.js';
	import { createCheckboxGroupContext } from './state.svelte.js';

	import type { CheckboxGroupProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		ref = $bindable(),
		checked = $bindable(false),
		disabled = $bindable(false),
		onCheckedChange,
		children,
		custom,
		...props
	}: CheckboxGroupProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = createCheckboxGroupContext({
		id: stateValue(() => id),
		ref: stateValue(() => ref!),
		checked: stateValue(
			() => checked,
			(v) => {
				checked = v;
				onCheckedChange?.(v);
			}
		),
		disabled: stateValue(() => disabled)
	});
</script>

<Element bind:ref {children} {custom} {ctx} {...props} />
