<script lang="ts">
	import { useActions, type BaseProps } from '$lib/internal/index.js';

	interface Props extends BaseProps<HTMLDivElement> {
		level?: 1 | 2 | 3 | 4 | 5 | 6;
	}

	let { children, class: klass, use = [], level = 3, self, ...props }: Props = $props();

	const classProp = $derived(typeof klass === 'function' ? klass({}) : klass);
</script>

<div
	bind:this={self}
	use:useActions={use}
	class={classProp}
	role="heading"
	aria-level={level}
	data-accordionheading=""
	{...props}
>
	{@render children({})}
</div>
