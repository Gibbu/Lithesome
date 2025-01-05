<script lang="ts">
	import { Element } from '$internal';
	import { createRootContext } from './main.svelte.js';
	import type { ToastProps } from './types.js';

	let { children, use = [], class: klass, self = $bindable(), as = 'div', transition, ...props }: ToastProps = $props();

	const ctx = createRootContext();
</script>

<Element {transition} {as} {klass} bind:self {use} {children} {...ctx.attrs} {...props} />
