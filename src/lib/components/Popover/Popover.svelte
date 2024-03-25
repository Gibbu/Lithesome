<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { createContext } from './context.svelte.js';

	const contextName = 'popover-context';

	export const context = () => getContext<ReturnType<typeof createContext>>(contextName);
</script>

<script lang="ts">
	import { createUID, useActions, KEYS, isBrowser, classProp, type BaseProps } from '$lib/internal/index.js';
	import { setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { visible: boolean }> {
		visible?: boolean;
	}

	let { children, use = [], class: klass, self, visible = false, ...props }: Props = $props();

	const { uid } = createUID('popover');
	const API = createContext(uid, visible, {
		onChange(val) {
			visible = val;
		}
	});
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

<div
	bind:this={self}
	use:useActions={use}
	id={uid()}
	class={classProp(klass, { visible: API.visible })}
	data-popover=""
	data-state={API.visible ? 'opened' : 'closed'}
	{...props}
>
	{@render children({ visible: API.visible })}
</div>
