<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { useRadioItem } from './main.svelte.js';
	import type { RadioGroupItemProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		disabled = $bindable(false),
		value,
		onClick,
		onKeydown,
		...props
	}: RadioGroupItemProps = $props();

	const ctx = useRadioItem({
		value,
		disabled,
		onContextChange(props) {
			value = props.value;
			disabled = props.disabled;
		}
	});

	$effect(() => {
		console.log(value);
		ctx.onComponentChange({ disabled, value });
	});
</script>

<button bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
	{@render children(ctx.state)}
</button>
