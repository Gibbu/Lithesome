<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId } from '$lib/internals/index.js';
	import { createModalRootContext } from './state.svelte.js';

	import type { ModalProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		visible = $bindable(false),
		disabled = $bindable(false),
		closeOnBackdropClick = true,
		portalTarget = 'body',
		children,
		...props
	}: ModalProps<typeof ctx.state> = $props();

	let ctx = createModalRootContext({
		id: stateValue(() => id),
		visible: stateValue(
			() => visible,
			(v) => (visible = v)
		),
		portalTarget: stateValue(() => portalTarget),
		disabled: stateValue(() => disabled),
		closeOnBackdropClick: stateValue(() => closeOnBackdropClick)
	});
</script>

<Element {children} {ctx} {...props} />
