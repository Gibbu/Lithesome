<script lang="ts">
	import { context } from './Combobox.svelte';
	import { useActions, classProp, log } from '$lib/internal/index.js';
	import { onMount } from 'svelte';
	import type { ComboboxArrowProps } from './types.js';

	let { class: klass, use = [], self = $bindable(), ...props }: ComboboxArrowProps = $props();

	const ctx = context();

	onMount(() => {
		if (!ctx) log.error('<ComboboxArrow /> must be a child element of <ComboboxContent />');
		if (!self) return;
		ctx.arrow = self;
	});
</script>

<div
	bind:this={self}
	use:useActions={use}
	id={ctx.uid('arrow')}
	class={classProp(klass, { visible: ctx.visible })}
	data-popoverarrow=""
	{...props}
></div>
