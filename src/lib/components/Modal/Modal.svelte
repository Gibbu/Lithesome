<script lang="ts" context="module">
	import { setupContext } from '$internal';
	import { ModalContext } from './context.svelte.js';

	export const { context, contextName } = setupContext<ModalContext>();
</script>

<script lang="ts">
	import { useActions, KEYS, classProp } from '$internal';
	import { usePortal } from '$lib/index.js';
	import { setContext } from 'svelte';
	import type { ModalProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		visible = $bindable(),
		portalTarget = 'body',
		...props
	}: ModalProps = $props();

	const ctx = new ModalContext({ visible });

	setContext(contextName, ctx);

	const handleKeys = (e: KeyboardEvent) => {
		const { key } = e;
		if (key === KEYS.escape) visible = false;
	};

	$effect(() => {
		ctx.visible = visible;
		if (visible) {
			window.addEventListener('keydown', handleKeys);
		} else {
			window.removeEventListener('keydown', handleKeys);
		}
	});
</script>

{#if visible}
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
