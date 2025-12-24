<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId } from '$lib/internals/index.js';
	import { createDropzoneRootContext } from './state.svelte.js';

	import type { DropzoneProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		ref = $bindable(),
		files = $bindable([]),
		disabled = $bindable(false),
		maxSize = 0,
		multiple = false,
		accept = '',
		onError,
		onSuccess,
		onChange,
		children,
		validate,
		custom,
		...props
	}: DropzoneProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = createDropzoneRootContext({
		id: stateValue(() => id),
		ref: stateValue(() => ref!),
		files: stateValue(
			() => files,
			(v) => (files = v)
		),
		disabled: stateValue(
			() => disabled,
			(v) => (disabled = v)
		),
		maxSize: stateValue(() => maxSize),
		multiple: stateValue(() => multiple),
		accept: stateValue(() => accept),
		onError,
		onSuccess,
		validate,
		onChange
	});
</script>

<Element bind:ref {children} {custom} {ctx} {...props} />
