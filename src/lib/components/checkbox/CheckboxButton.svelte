<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId, styleObjectToString, visuallyHidden } from '$lib/internals/index.js';
	import { useCheckboxButton } from './state.svelte.js';

	import type { CheckboxButtonProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		ref = $bindable(),
		checked = $bindable(false),
		disabled = $bindable(false),
		required,
		name,
		value,
		onCheckedChange,
		children,
		custom,
		...props
	}: CheckboxButtonProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = useCheckboxButton({
		id: stateValue(() => id),
		ref: stateValue(() => ref!),
		checked: stateValue(
			() => checked,
			(v) => {
				checked = v;
				onCheckedChange?.(v);
			}
		),
		disabled: stateValue(
			() => disabled,
			(v) => (disabled = v)
		),
		value: stateValue(() => value!),
		name: stateValue(() => name!),
		required: stateValue(() => required!)
	});
</script>

<Element bind:ref as="button" {children} {custom} {ctx} {...props} />

{#if name}
	<input
		type="checkbox"
		bind:checked={ctx.CheckedBool}
		{name}
		value={value || 'on'}
		aria-hidden="true"
		tabindex="-1"
		style={styleObjectToString(visuallyHidden)}
	/>
{/if}
