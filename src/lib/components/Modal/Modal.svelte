<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { createContext } from './context.svelte.js';

	const contextName = 'modal-context';

	export const context = () => getContext<ReturnType<typeof createContext>>(contextName);
</script>

<script lang="ts">
	import { createUID, useActions, portal, KEYS, isBrowser, classProp, type BaseProps } from '$lib/internal/index.js';
	import { setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement> {
		visible: boolean;
		portalTarget?: string | HTMLElement;
	}

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		visible = $bindable(),
		portalTarget = 'body',
		...props
	}: Props = $props();

	const { uid } = createUID('modal');
	const API = createContext(uid, visible);

	setContext(contextName, API);

	const handleKeys = (e: KeyboardEvent) => {
		const { key } = e;
		if (key === KEYS.escape) visible = false;
	};

	$effect(() => {
		API.setVisible(visible);
		if (isBrowser) {
			if (visible) {
				window.addEventListener('keydown', handleKeys);
			} else {
				window.removeEventListener('keydown', handleKeys);
			}
		}
	});
</script>

{#if visible}
	<div
		bind:this={self}
		use:portal={portalTarget}
		use:useActions={use}
		id={uid()}
		class={classProp(klass)}
		data-modal=""
		{...props}
	>
		{@render children({})}
	</div>
{/if}
