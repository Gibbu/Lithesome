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

	const ctx = createRootContext({
		visible: stateValue(
			() => visible,
			(v) => (visible = v)
		)
	});
</script>

{#if ctx.visible.val}
	<div
		bind:this={self}
		use:usePortal={portalTarget}
		use:useActions={use}
		class={classProp(klass)}
		{...ctx.attrs}
		{...props}
	>
		{@render children({})}
	</div>
{/if}
