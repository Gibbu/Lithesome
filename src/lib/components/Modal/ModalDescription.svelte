<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { context } from './Modal.svelte';
	import type { ModalDescriptionProps } from './types.js';

	let { children, class: klass, use = [], self = $bindable(), ...props }: ModalDescriptionProps = $props();

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
