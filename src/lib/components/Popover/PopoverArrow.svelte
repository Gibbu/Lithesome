<script lang="ts">
	import { context } from './Popover.svelte';
	import { useActions, classProp, log, type BasePropsNoChildren } from '$lib/internal/index.js';
	import { onMount } from 'svelte';

	interface Props extends BasePropsNoChildren<HTMLDivElement, { visible: boolean }> {}

	let { class: klass, use = [], self = $bindable(), ...props }: Props = $props();

	const ctx = context();

	onMount(() => {
		if (!ctx) log.error('<PopoverArrow /> must be a child element of <PopoverContent />');
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
/>
