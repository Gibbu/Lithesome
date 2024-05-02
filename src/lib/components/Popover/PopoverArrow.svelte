<script lang="ts">
	import { context } from './Popover.svelte';
	import { FloatingArrow } from '$lib/internal/index.js';
	import type { PopoverArrowProps } from './types.js';

	let { class: klass, use = [], self = $bindable(), ...props }: PopoverArrowProps = $props();

	const ctx = context();
</script>

<FloatingArrow
	{ctx}
	component="Popover"
	state={{ visible: ctx.visible }}
	class={klass}
	id={ctx.uid('arrow')}
	{...props}
/>
