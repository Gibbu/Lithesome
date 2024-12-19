<script lang="ts">
	import { Element } from '$internal';
	import { useModalDescription } from './main.svelte.js';

	import type { ModalDescriptionProps } from './types.js';

	let { children, class: klass, use = [], self = $bindable(), as = 'p', ...props }: ModalDescriptionProps = $props();

	const ctx = useModalDescription();
</script>

<Element {as} {klass} bind:self {use} {children} {...ctx.attrs} {...props} />
