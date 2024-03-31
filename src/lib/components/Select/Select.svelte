<script lang="ts" context="module">
	import { getContext, onMount, tick } from 'svelte';
	import { SelectContext } from './context.svelte.js';

	const contextName = 'select-context';

	export const context = () => getContext<SelectContext>(contextName);
</script>

<script lang="ts" generics="ValueType">
	import { useActions, classProp, type BaseProps, type JsonValue } from '$lib/internal/index.js';
	import { setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { visible: boolean }> {
		value: ValueType;
		onChange?: (value: JsonValue) => void;
	}

	let {
		children,
		use = [],
		class: klass,
		value = $bindable(),
		self = $bindable(),
		onChange,
		...props
	}: Props = $props();

	const multiple = Array.isArray(value);
	const ctx = new SelectContext<ValueType>(
		{ multiple },
		{
			onChange(val) {
				value = val;
			}
		}
	);
	setContext(contextName, ctx);

	onMount(async () => {
		await tick();
		ctx.setInitialSelected(value);
		ctx.close();
		ctx.mounted = true;
	});
</script>

<div
	bind:this={self}
	use:useActions={use}
	id={ctx.uid()}
	class={classProp(klass, { visible: ctx.visible && ctx.mounted })}
	data-select=""
	data-state={ctx.visible && ctx.mounted ? 'opened' : 'closed'}
	{...props}
>
	{@render children({ visible: ctx.visible && ctx.mounted })}
</div>
