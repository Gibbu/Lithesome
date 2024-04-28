<script lang="ts">
	import { context } from './Menu.svelte';
	import { useActions, classProp, log } from '$lib/internal/index.js';
	import { onMount } from 'svelte';
	import type { MenuArrowProps } from './types.js';

	let { class: klass, use = [], self = $bindable(), ...props }: MenuArrowProps = $props();

	const ctx = context();

	onMount(() => {
		if (!ctx) log.error('<MenuArrow /> must be a child element of <MenuContent />');
		if (!self) return;
		ctx.arrow = self;
	});
</script>

<div
	bind:this={self}
	use:useActions={use}
	id={ctx.uid('arrow')}
	class={classProp(klass, { visible: ctx.visible })}
	data-menuarrow=""
	{...props}
></div>
