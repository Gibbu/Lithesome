<script lang="ts">
	import { FloatingArrow } from '$internal';
	import { useSelectArrow } from './main.svelte.js';
	import type { SelectArrowProps } from './types.js';

	let { class: klass, use = [], self = $bindable(), ...props }: SelectArrowProps = $props();

	const ctx = useSelectArrow();
</script>

<FloatingArrow {ctx} component="Select" class={klass} {...props} />
