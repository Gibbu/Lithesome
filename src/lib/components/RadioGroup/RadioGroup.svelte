<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { createContext } from './context.svelte.js';

	const contextName = 'radiogroup-context';

	export const context = () => getContext<ReturnType<typeof createContext>>(contextName);
</script>

<script lang="ts">
	import { createUID, useActions, classProp, type BaseProps, type JsonValue } from '$lib/internal/index.js';
	import { setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement> {
		value: JsonValue;
		required?: boolean;
	}

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		value = $bindable(),
		required,
		...props
	}: Props = $props();

	const { uid } = createUID('accordion');
	const API = createContext(uid, value, {
		onChange(val) {
			value = val;
		}
	});

	setContext(contextName, API);
</script>

<div
	bind:this={self}
	use:useActions={use}
	class={classProp(klass)}
	role="radiogroup"
	aria-required={required}
	data-radiogroup=""
	{...props}
>
	{@render children({})}
</div>
