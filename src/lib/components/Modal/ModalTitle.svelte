<script lang="ts">
	import { Element } from '$internal';
	import { useModalTitle } from './main.svelte.js';
	import type { ModalTitleProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		as = 'h2',
		transition,
		...props
	}: ModalTitleProps = $props();

	const ctx = useModalTitle();
</script>

<Element {transition} {as} {klass} bind:self {use} {children} {...ctx.attrs} {...props} />
