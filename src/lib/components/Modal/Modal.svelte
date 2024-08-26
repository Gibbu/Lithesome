<script lang="ts">
	import { useActions, classProp } from '$internal';
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
		visible,
		onContextChange(props) {
			visible = props.visible;
		}
	});

	$effect(() => {
		if (visible !== ctx.visible) ctx.onComponentChange({ visible });
	});
</script>

{#if ctx.visible}
	<div
		bind:this={self}
		use:usePortal={portalTarget}
		use:useActions={use}
		id={ctx.uid()}
		class={classProp(klass)}
		data-modal=""
		{...props}
	>
		{@render children({})}
	</div>
{/if}
