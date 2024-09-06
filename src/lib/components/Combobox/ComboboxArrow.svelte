<script lang="ts">
	import { FloatingArrow } from '$internal';
	import { useComboboxArrow } from './main.svelte.js';
	import type { ComboboxArrowProps } from './types.js';

	let { class: klass, use = [], self = $bindable(), ...props }: ComboboxArrowProps = $props();

	const ctx = useComboboxArrow();
</script>

<FloatingArrow {ctx} component="Combobox" class={klass} {...props} />
