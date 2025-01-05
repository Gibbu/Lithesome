<script lang="ts">
	import { useTooltipArrow } from './main.svelte.js';
	import { FloatingArrow } from '$internal';
	import type { TooltipArrowProps } from './types.js';

	let { class: klass, use = [], self = $bindable(), as = 'div', ...props }: TooltipArrowProps = $props();

	const ctx = useTooltipArrow();
</script>

<FloatingArrow {as} {ctx} component="Tooltip" class={klass} {...ctx.attrs} {...props} />
