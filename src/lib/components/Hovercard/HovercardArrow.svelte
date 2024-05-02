<script lang="ts">
	import { context } from './Hovercard.svelte';
	import { FloatingArrow } from '$lib/internal/index.js';
	import type { HovercardArrowProps } from './types.js';

	let { class: klass, use = [], self = $bindable(), ...props }: HovercardArrowProps = $props();

	const ctx = context();
</script>

<FloatingArrow
	{ctx}
	component="Hovercard"
	state={{ visible: ctx.visible }}
	class={klass}
	id={ctx.uid('arrow')}
	{...props}
/>
