<script lang="ts">
	import { Element } from '$internal';
	import { useCheckboxLabel } from './main.svelte.js';

	import type { CheckboxLabelProps } from './types.js';

	let { children, as = 'label', class: klass, self = $bindable(), use = [], ...props }: CheckboxLabelProps = $props();

	const ctx = useCheckboxLabel();
</script>

<Element {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
