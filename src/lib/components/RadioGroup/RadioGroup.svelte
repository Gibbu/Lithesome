<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { createContext } from './context.svelte.js';

	const contextName = 'radiogroup-context';

	export const context = () => getContext<ReturnType<typeof createContext>>(contextName);
</script>

<script lang="ts">
	import { useActions, classProp, type BaseProps, type JsonValue } from '$lib/internal/index.js';
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

	const ctx = createContext(
		{ value },
		{
			onChange(val) {
				value = val;
			}
		}
	);

	setContext(contextName, ctx);
</script>

<div
	bind:this={self}
	use:useActions={use}
	id={ctx.uid()}
	class={classProp(klass)}
	role="radiogroup"
	aria-required={required}
	data-radiogroup=""
	{...props}
>
	{@render children({})}
</div>
