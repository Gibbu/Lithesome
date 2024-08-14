<script lang="ts">
	import { createAccordionItemContext } from './main.svelte.js';
	import { useActions, classProp } from '$internal';

	import type { AccordionItemProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		disabled = $bindable(false),
		...props
	}: AccordionItemProps = $props();

	const ctx = createAccordionItemContext({
		disabled,
		onContextChange(props) {
			disabled = props.disabled;
		}
	});

	$effect(() => {
		ctx.onComponentChange({ disabled });
	});
</script>

<div bind:this={self} use:useActions={use} {...ctx.attrs} class={classProp(klass, ctx.state)} {...props}>
	{@render children(ctx.state)}
</div>
