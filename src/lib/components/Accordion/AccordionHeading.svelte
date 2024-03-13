<script lang="ts">
	import { useActions, type BaseProps } from '$lib/internal/index.js';

	interface Props extends BaseProps<HTMLDivElement> {
		level?: 1 | 2 | 3 | 4 | 5 | 6;
	}

	let { children, class: klass, use = [], level = 3, self, ...props } = $props<Props>();

	const classProp = $derived(typeof klass === 'function' ? klass({}) : klass);
</script>

<div
	bind:this={self}
	role="heading"
	aria-level={level}
	data-accordionheading=""
	use:useActions={use}
	class={classProp}
	{...props}
>
	{@render children({})}
</div>
