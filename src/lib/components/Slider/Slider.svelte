<script lang="ts" context="module">
	import { clamp, setupContext } from '$internal';
	import { SliderContext } from './context.svelte.js';

	export const { context, contextName } = setupContext<SliderContext>();
</script>

<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { setContext } from 'svelte';
	import type { SliderProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		min = $bindable(0),
		max = $bindable(100),
		step = $bindable(1),
		value = $bindable(50),
		orientation = $bindable('horizontal'),
		reverse = $bindable(false),
		disabled = $bindable(false),
		onMousedown,
		onClick,
		...props
	}: SliderProps = $props();

	const ctx = new SliderContext(
		{ min, max, step, value, orientation, reverse, disabled },
		{
			onChange(val) {
				value = val;
			}
		}
	);
	const state = $derived({
		value: ctx.value,
		percentage: ctx.Percentage
	});

	setContext(contextName, ctx);

	const calculateValue = (e: MouseEvent) => {
		if (!ctx.dragging || !ctx.trackElement) return;

		const { clientX, clientY } = e;
		const { width, height, left, right, top, bottom } = ctx.trackElement.getBoundingClientRect();

		const position = ctx.orientation === 'horizontal' ? clientX : clientY;
		const length = ctx.orientation === 'horizontal' ? width : height;
		const start = ctx.orientation === 'horizontal' ? (ctx.reverse ? right : left) : ctx.reverse ? top : bottom;

		ctx.value = clamp(
			ctx.min,
			Math.round(
				((max - min) *
					((position - start) / length) *
					(ctx.reverse ? -1 : 1) *
					(ctx.orientation === 'vertical' ? -1 : 1)) /
					step
			) * step,
			ctx.max
		);
	};
	const loseFocus = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (target !== ctx.trackElement || (ctx.thumbElement && !target.contains(ctx.thumbElement))) ctx.dragging = false;
	};

	const handleMousedown: typeof onMousedown = (e) => {
		onMousedown?.(e);
		if (disabled) return;
		ctx.dragging = true;
	};
	const handleClick: typeof onClick = (e) => {
		onClick?.(e);
		if (disabled) return;
		e.preventDefault();
		ctx.dragging = true;
		calculateValue(e);
		ctx.dragging = false;
	};

	$effect(() => {
		ctx.trackElement = self;

		if (disabled || !ctx.trackElement) return;

		document.addEventListener('mousemove', calculateValue);
		document.addEventListener('mouseup', loseFocus);

		return () => {
			document.removeEventListener('mousemove', calculateValue);
			document.removeEventListener('mouseup', loseFocus);
		};
	});

	$effect(() => {
		ctx.updateProps({ min, max, disabled, orientation, reverse, step, value });
	});
</script>

<div
	bind:this={self}
	use:useActions={use}
	id={ctx.uid()}
	class={classProp(klass, state)}
	tabindex="-1"
	role="none"
	data-slider=""
	data-value={ctx.value}
	data-percentage={ctx.Percentage}
	data-reversed={ctx.reverse || undefined}
	data-orientation={ctx.orientation}
	onmousedown={handleMousedown}
	onclick={handleClick}
	{...props}
>
	{@render children(state)}
</div>
