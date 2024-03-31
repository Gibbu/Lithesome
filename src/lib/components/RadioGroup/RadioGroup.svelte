<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { RadiogroupContext } from './context.svelte.js';

	const contextName = 'radiogroup-context';

	export const context = () => getContext<RadiogroupContext>(contextName);
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

	const ctx = new RadiogroupContext(
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
