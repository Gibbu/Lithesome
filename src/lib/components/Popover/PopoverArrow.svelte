<script lang="ts">
	import { usePopoverArrow } from './main.svelte.js';
	import { FloatingArrow } from '$internal';
	import type { PopoverArrowProps } from './types.js';

	let { class: klass, use = [], self = $bindable(), as = 'div', ...props }: PopoverArrowProps = $props();

	const ctx = usePopoverArrow();
</script>

<FloatingArrow {as} {ctx} component="Popover" class={klass} {...ctx.attrs} {...props} />
