<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { useComboboxInput } from './main.svelte.js';
	import type { ComboboxInputProps } from './types.js';

	let { class: klass, use = [], value = $bindable(), self = $bindable(), ...props }: ComboboxInputProps = $props();

	const ctx = useComboboxInput();

	$effect(() => {
		if (self) ctx.registerTrigger(self);
	});
</script>

<input bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} bind:value {...ctx.attrs} {...props} />
