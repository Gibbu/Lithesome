<script lang="ts">
	import { context } from './Combobox.svelte';
	import { FloatingArrow } from '$internal';
	import type { ComboboxArrowProps } from './types.js';

	let { class: klass, use = [], self = $bindable(), ...props }: ComboboxArrowProps = $props();

	const ctx = context();
</script>

<FloatingArrow
	{ctx}
	component="Combobox"
	state={{ visible: ctx.visible }}
	class={klass}
	id={ctx.uid('arrow')}
	{...props}
/>
