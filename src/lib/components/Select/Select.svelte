<script lang="ts" context="module">
	import { getContext, onMount, tick } from 'svelte';
	import { createContext } from './context.svelte.js';

	const contextName = 'select-context';

	export const context = () => getContext<ReturnType<typeof createContext>>(contextName);
</script>

<script lang="ts">
	import { createUID, useActions, classProp, type BaseProps, type JsonValue } from '$lib/internal/index.js';
	import { setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { visible: boolean }> {
		value: JsonValue;
		onChange?: (value: JsonValue) => void;
	}

	let { children, use = [], class: klass, value, self, onChange, ...props }: Props = $props();

	const { uid } = createUID('select');
	const multiple = Array.isArray(value);
	const API = createContext(uid, multiple, {
		onChange(val) {
			value = val;
		}
	});
	setContext(contextName, API);

	onMount(async () => {
		await tick();
		API.setInitialSelected(value);
		API.close();
		await tick();
		API.setMounted(true);
	});
</script>

<div
	bind:this={self}
	use:useActions={use}
	id={uid()}
	class={classProp(klass, { visible: API.visible })}
	data-select=""
	data-state={API.visible ? 'opened' : 'closed'}
	{...props}
>
	{@render children({ visible: API.visible })}
</div>
