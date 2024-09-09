<script lang="ts">
	import { FloatingArrow } from '$internal';
	import { useMenuArrow } from './main.svelte.js';
	import type { MenuArrowProps } from './types.js';

	let { class: klass, use = [], self = $bindable(), ...props }: MenuArrowProps = $props();

	const ctx = useMenuArrow();
</script>

<FloatingArrow {ctx} component="Menu" class={klass} {...ctx.attrs} {...props} />
