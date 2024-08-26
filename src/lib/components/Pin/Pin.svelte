<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { createRootContext } from './main.svelte.js';
	import type { PinProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		value = $bindable([]),
		disabled = $bindable(false),
		type = $bindable('text'),
		placeholder = '○',
		onChange,
		onFilled,
		...props
	}: PinProps = $props();

	const ctx = createRootContext({
		value,
		disabled,
		type,
		placeholder,
		onContextChange(props) {
			value = typeof props.value === 'string' ? props.value.split('') : props.value;
			disabled = props.disabled;
			type = props.type;
		}
	});

	$effect(() => {
		ctx.onComponentChange({ value, disabled, type, placeholder });
		if (ctx.Filled) onFilled?.(ctx.TransformedValue);
	});
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
	{@render children(ctx.state)}
</div>
