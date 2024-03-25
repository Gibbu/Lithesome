<script lang="ts">
	import { useActions, classProp, type BaseProps } from '$lib/internal/index.js';

	interface Props extends BaseProps<HTMLDivElement> {
		level?: 1 | 2 | 3 | 4 | 5 | 6;
	}

	let { children, class: klass, use = [], level = 3, self, ...props }: Props = $props();
</script>

<div
	bind:this={self}
	use:useActions={use}
	class={classProp(klass)}
	role="heading"
	aria-level={level}
	data-accordionheading=""
	{...props}
>
	{@render children({})}
</div>
