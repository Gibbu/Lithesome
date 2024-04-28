<script lang="ts">
	import { context } from './Hovercard.svelte';
	import { useActions, classProp, log } from '$lib/internal/index.js';
	import { onMount } from 'svelte';
	import type { HovercardArrowProps } from './types.js';

	let { class: klass, use = [], self = $bindable(), ...props }: HovercardArrowProps = $props();

	const ctx = context();

	onMount(() => {
		if (!ctx) log.error('<HovercardArrow /> must be a child element of <HovercardContent />');
		if (!self) return;
		ctx.arrow = self;
	});
</script>

<div
	bind:this={self}
	use:useActions={use}
	id={ctx.uid('arrow')}
	class={classProp(klass, { visible: ctx.visible })}
	data-hovercardarrow=""
	{...props}
></div>
