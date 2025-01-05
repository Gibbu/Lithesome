<script lang="ts">
	import { Element } from '$internal';
	import { useSliderThumb } from './main.svelte.js';

	import type { SliderThumbProps } from './types.js';

	let {
		use = [],
		class: klass,
		self = $bindable(),
		onMousedown,
		onKeydown,
		as = 'div',
		transition,
		...props
	}: SliderThumbProps = $props();

	const ctx = useSliderThumb(self, {
		onKeydown,
		onMousedown
	});
</script>

<Element {transition} {as} {klass} bind:self {use} state={ctx.state} {...ctx.attrs} {...props} />
