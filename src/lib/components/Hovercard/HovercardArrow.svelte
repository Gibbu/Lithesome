<script lang="ts">
	import { FloatingArrow } from '$internal';
	import { useHovercardArrow } from './main.svelte.js';
	import type { HovercardArrowProps } from './types.js';

	let { class: klass, use = [], self = $bindable(), ...props }: HovercardArrowProps = $props();

	const ctx = useHovercardArrow();
</script>

<FloatingArrow {ctx} component="Hovercard" class={klass} {...props} />
