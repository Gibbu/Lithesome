<script lang="ts">
	import { context } from './Select.svelte';
	import { FloatingArrow } from '$lib/internal/index.js';
	import type { SelectArrowProps } from './types.js';

	let { class: klass, use = [], self = $bindable(), ...props }: SelectArrowProps = $props();

	const ctx = context();
</script>

<FloatingArrow
	{ctx}
	component="Select"
	state={{ visible: ctx.visible }}
	class={klass}
	id={ctx.uid('arrow')}
	{...props}
/>
