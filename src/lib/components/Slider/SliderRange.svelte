<script lang="ts">
	import { classProp, useActions } from '$internal';
	import { context } from './Slider.svelte';

	import type { SliderRangeProps } from './types.js';

	let { use = [], class: klass, self = $bindable(), ...props }: SliderRangeProps = $props();

	const ctx = context();

	const styles = $derived.by(() => {
		const perc = `${ctx.Percentage}%`;
		let obj = {};

		if (ctx.orientation === 'horizontal') {
			obj = ctx.reverse ? { width: perc, right: '0' } : { width: perc, left: '0' };
		} else if (ctx.orientation === 'vertical') {
			obj = ctx.reverse ? { height: perc, top: '0' } : { height: perc, bottom: '0' };
		}

		return Object.entries(obj)
			.map(([k, v]) => `${k}:${v}`)
			.join(';');
	});
</script>

<div
	bind:this={self}
	use:useActions={use}
	id={ctx.uid('range')}
	class={classProp(klass, { value: ctx.value, percentage: ctx.Percentage })}
	tabindex="-1"
	role="none"
	data-slider=""
	data-value={ctx.value}
	data-percentage={ctx.Percentage}
	data-reversed={ctx.reverse || undefined}
	data-orientation={ctx.orientation}
	style="position: absolute; {styles}"
	{...props}
></div>
