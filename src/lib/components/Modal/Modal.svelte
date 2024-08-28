<script lang="ts">
	import { useActions, classProp, stateValue } from '$internal';
	import { usePortal } from '$lib/index.js';
	import { createRootContext } from './main.svelte.js';
	import type { ModalProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		visible = $bindable(false),
		portalTarget = 'body',
		...props
	}: ModalProps = $props();

	createRootContext({
		visible: stateValue(
			() => visible,
			(v) => (visible = v)
		),
		portalTarget: stateValue(() => portalTarget)
	});
</script>

{@render children({})}
