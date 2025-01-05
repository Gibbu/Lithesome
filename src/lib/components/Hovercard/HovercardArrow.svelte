<script lang="ts">
	import { FloatingArrow } from '$internal';
	import { useHovercardArrow } from './main.svelte.js';
	import type { HovercardArrowProps } from './types.js';

	let { class: klass, use = [], self = $bindable(), as = 'div', ...props }: HovercardArrowProps = $props();

	const ctx = useHovercardArrow();
</script>

<FloatingArrow {as} {ctx} component="Hovercard" class={klass} {...props} />
