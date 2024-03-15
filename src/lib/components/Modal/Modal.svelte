<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { createContext } from './context.svelte.js';

	const contextName = 'modal-context';

	export const context = () => getContext<ReturnType<typeof createContext>>(contextName);
</script>

<script lang="ts">
	import { createUID, useActions, type BaseProps, portal, KEYS, isBrowser } from '$lib/internal/index.js';
	import { setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement> {
		visible: boolean;
		portalTarget?: string | HTMLElement;
	}

	let { children, use = [], class: klass, self, visible, portalTarget = 'body', ...props } = $props<Props>();

	const { uid } = createUID('modal');
	const API = createContext(uid, visible);

	setContext(contextName, API);

	const classProp = $derived(typeof klass === 'function' ? klass({}) : klass);

	const handleKeys = (e: KeyboardEvent) => {
		const { key } = e;
		if (key === KEYS.escape) visible = false;
	};

	$effect(() => {
		API.updateVisible(visible);
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
		class={classProp}
		data-modal=""
		{...props}
	>
		{@render children({})}
	</div>
{/if}
