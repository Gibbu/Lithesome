<script lang="ts" context="module">
	import { setupContext } from '$lib/internal/index.js';
	import { ModalContext } from './context.svelte.js';

	export const { context, contextName } = setupContext<ModalContext>();
</script>

<script lang="ts">
	import { createUID, useActions, KEYS, classProp } from '$lib/internal/index.js';
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

	const { uid } = createUID('modal');
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
		id={uid()}
		class={classProp(klass)}
		data-modal=""
		{...props}
	>
		{@render children({})}
	</div>
{/if}
