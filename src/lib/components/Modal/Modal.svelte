<script lang="ts">
	import { stateValue } from '$internal';
	import { createRootContext } from './main.svelte.js';
	import type { ModalProps } from './types.js';

	let { children, visible = $bindable(false), portalTarget = 'body' }: ModalProps = $props();

	createRootContext({
		visible: stateValue(
			() => visible,
			(v) => (visible = v)
		),
		portalTarget: stateValue(() => portalTarget)
	});
</script>

{@render children({})}
