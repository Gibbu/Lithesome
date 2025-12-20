<script lang="ts">
	import { Element, parseId, stateValue } from '$lib/internals/index.js';
	import { useTabsButton } from './state.svelte.js';

	import type { TabsButtonProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		value = $bindable(''),
		disabled = $bindable(false),
		ref = $bindable(),
		...props
	}: TabsButtonProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = useTabsButton({
		id,
		ref: stateValue(() => ref!),
		value: stateValue(
			() => value,
			(v) => (value = v)
		),
		disabled: stateValue(() => disabled)
	});
</script>

<Element bind:ref {children} {custom} {ctx} {...props} />
