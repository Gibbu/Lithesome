<script lang="ts" context="module">
	import { getContext, onMount, tick } from 'svelte';
	import { createContext } from './context.svelte.js';

	const contextName = 'select-context';

	export const context = () => getContext<ReturnType<typeof createContext>>(contextName);
</script>

<script lang="ts">
	import { createUID, useActions, type BaseProps, type JsonValue } from '$lib/internal/index.js';
	import { setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { visible: boolean }> {
		value: JsonValue;
		onChange?: (value: JsonValue) => void;
	}

	let { children, use = [], class: klass, value, onChange, ...props } = $props<Props>();

	const { uid } = createUID('select');
	const multiple = Array.isArray(value);
	const API = createContext(uid, multiple, {
		onChange(val) {
			value = val;
		}
	});

	setContext(contextName, API);

	const classProp = $derived(typeof klass === 'function' ? klass({ visible: API.visible }) : klass);

	onMount(async () => {
		await tick();
		API.setInitialSelected(value);
		API.close();
		await tick();
		API.setMounted(true);
	});
</script>

<div
	use:useActions={use}
	data-select=""
	data-state={API.visible ? 'opened' : 'closed'}
	id={uid()}
	{...props}
	class={classProp}
>
	{@render children({ visible: API.visible })}
</div>
