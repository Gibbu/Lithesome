<script lang="ts">
	import { ALL_ARROW_KEYS, KEYS, classProp, useActions } from '$internal';
	import { context } from './Slider.svelte';

	import type { SliderThumbProps } from './types.js';

	let { use = [], class: klass, self = $bindable(), onMousedown, onKeydown, ...props }: SliderThumbProps = $props();

	const ctx = context();

	$effect(() => {
		ctx.thumbElement = self;
	});

	const handleMousedown: typeof onMousedown = (e) => {
		onMousedown?.(e);
		if (ctx.disabled) return;
		e.preventDefault();
	};
	const handleKeydown: typeof onKeydown = (e) => {
		onKeydown?.(e);
		if (ctx.disabled) return;
		const { key } = e;
		if (ALL_ARROW_KEYS.includes(key)) e.preventDefault();

		if (key === KEYS.arrowRight || key === KEYS.arrowUp) {
			if (ctx.reverse) ctx.stepDown();
			else ctx.stepUp();
		}
		if (key === KEYS.arrowLeft || key === KEYS.arrowDown) {
			if (ctx.reverse) ctx.stepUp();
			else ctx.stepDown();
		}
	};

	const styles = $derived.by(() => {
		const perc = `${ctx.Percentage}%`;
		let translate = '';
		let obj = {};

		if (ctx.orientation === 'horizontal') {
			obj = ctx.reverse ? { right: perc } : { left: perc };
			translate = ctx.reverse ? '50%' : '-50%';
		} else if (ctx.orientation === 'vertical') {
			obj = ctx.reverse ? { top: perc } : { bottom: perc };
			translate = ctx.reverse ? '0 -50%' : '0 50%';
		}
		obj = { ...obj, translate };

		return Object.entries(obj)
			.map(([k, v]) => `${k}:${v}`)
			.join(';');
	});
</script>

<div
	bind:this={self}
	use:useActions={use}
	id={ctx.uid('thumb')}
	class={classProp(klass, { value: ctx.value, percentage: ctx.Percentage })}
	role="slider"
	tabindex="0"
	aria-valuenow={ctx.value}
	aria-valuemin={ctx.min}
	aria-valuemax={ctx.max}
	data-sliderthumb=""
	onmousedown={handleMousedown}
	onkeydown={handleKeydown}
	style="position: absolute; {styles}"
	{...props}
></div>
