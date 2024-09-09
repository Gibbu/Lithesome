<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { usePinInput } from './main.svelte.js';
	import type { PinInputProps } from './types.js';

	let {
		class: klass,
		use = [],
		self = $bindable(),
		onKeydown,
		onInput,
		onFocus,
		onBlur,
		onPaste,
		...props
	}: PinInputProps = $props();

	const ctx = usePinInput();
</script>

<input bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props} />
