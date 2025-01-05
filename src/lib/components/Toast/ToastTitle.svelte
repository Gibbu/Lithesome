<script lang="ts">
	import { Element } from '$internal';
	import { useToastTitle } from './main.svelte.js';
	import type { ToastTitleProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		transition,
		as = 'h3',
		...props
	}: ToastTitleProps = $props();

	const ctx = useToastTitle();
</script>

<Element {transition} {as} {klass} bind:self {use} {children} {...ctx.attrs} {...props} />
