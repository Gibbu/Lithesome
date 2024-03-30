<script lang="ts">
	import { useActions, classProp, type BaseProps } from '$lib/internal/index.js';
	import { context } from './Modal.svelte';

	interface Props extends BaseProps<HTMLParagraphElement> {}

	let { children, class: klass, use = [], self = $bindable(), ...props }: Props = $props();

	const ctx = context();
</script>

<p
	bind:this={self}
	use:useActions={use}
	id={ctx.uid('description')}
	class={classProp(klass)}
	data-modaldescription=""
	{...props}
>
	{@render children({})}
</p>
