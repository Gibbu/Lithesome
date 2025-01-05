<script lang="ts">
	import { Element } from '$internal';
	import { useToastDescription } from './main.svelte.js';
	import type { ToastMessageProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		transition,
		as = 'p',
		...props
	}: ToastMessageProps = $props();

	const ctx = useToastDescription();
</script>

<Element {transition} {as} {klass} bind:self {use} {children} {...ctx.attrs} {...props} />
