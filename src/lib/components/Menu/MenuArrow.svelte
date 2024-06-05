<script lang="ts">
	import { context } from './Menu.svelte';
	import { FloatingArrow } from '$internal';
	import type { MenuArrowProps } from './types.js';

	let { class: klass, use = [], self = $bindable(), ...props }: MenuArrowProps = $props();

	const ctx = context();
</script>

<FloatingArrow {ctx} component="Menu" state={{ visible: ctx.visible }} class={klass} id={ctx.uid('arrow')} {...props} />
