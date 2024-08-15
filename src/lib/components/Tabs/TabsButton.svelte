<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { useTabsButton } from './main.svelte.js';
	import type { TabsButtonProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		disabled = $bindable(false),
		value,
		...props
	}: TabsButtonProps = $props();

	const ctx = useTabsButton({
		value,
		disabled,
		onContextChange(props) {
			disabled = props.disabled;
		}
	});
</script>

<button bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
	{@render children(ctx.state)}
</button>
